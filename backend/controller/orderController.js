const OrderSchema = require("../model/orderModel");
const CustomError = require("../utils/customError");

const Product = require("../model/productModel");

class Order {
  createOrder = async function (req, res) {
    try {
      const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

      // group cart items by shopId

      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;

        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }

        shopItemsMap.get(shopId).push(item);
      }

      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        const order = await OrderSchema.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });

        orders.push(order);
      }

      res.status(201).json({ success: true, orders });
    } catch (error) {
      new CustomError(error.message, 500);
    }
  };

  getUserOrder = async function (req, res, next) {
    const id = req.user._id;
    try {
      const orders = await OrderSchema.find({ "user._id": id.toString() }).sort(
        {
          createdAt: -1,
        }
      );

      res.status(200).json({ success: true, orders });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };

  getShopOrder = async function (req, res, next) {
    const id = req.seller._id;
    try {
      const orders = await OrderSchema.find({
        "cart.shopId": id.toString(),
      }).sort({ createdAt: -1 });

      console.log(orders)
      res.status(200).json({ success: true, orders });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };

  updateOrderStatus = async function (req, res, next) {
    try {
      const order = await OrderSchema.findById(req.params.id);

      if (!order) {
        return next(new CustomError("Order not found with this id", 404));
      }
      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      if (order.status === "Transferred to delivery partner") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });

        if (order.status === "Delivered") {
          order.deliveredAt = Date.now();
          order.paymentInfo.status = "Succeeded";
          await order.save({ validateBeforeSave: false });
        }

        res.status(200).json({ success: true, order });

        async function updateOrder(id, qty) {
          const product = await Product.findById(id);

          product.stock -= qty;
          product.sold_out += qty;
          await product.save({ validateBeforeSave: false });
        }
      }

      res.status(200).json();
    } catch (error) {
      return next(new CustomError(error.message));
    }
  };

  giveRefund = async function (req, res, next) {
    try {
      const order = await OrderSchema.findById(req.params.id);

      if (!order) {
        return next(new CustomError("Order not found with this id", 404));
      }
      order.status = req.body.status;

      await order.save({ validateBeforeSave: false });

      res.status(200).json({ success: true, order });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };

  acceptTheRefund = async function (req, res, next) {
    try {
      const order = await OrderSchema.findById(req.params.id);

      if (!order) {
        return next(new CustomError("Order not found with this id", 404));
      }

      order.status = req.body.status;
      await order.save();

      res.status(200).json();
      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;
        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };
}

module.exports = Order;
