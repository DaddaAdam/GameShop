import Order from "../models/orderModel.js";
import expressAsyncHandler from "express-async-handler";

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
// @access  Private
const addOrderItems = expressAsyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("ERREUR: aucun article ne se trouve dans le panier.");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Récupérer une commande par son Id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = expressAsyncHandler(async (req, res) => {
  //On récupére la commande et on y ajoute le nom et l'email de l'utilisateur qui a passé la commande
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  try {
    if (order) {
      res.json(order);
    } else
      res.status(404).json({
        message: "La commande specifie n'existe pas.",
      });
  } catch (err) {
    console.log(err.message);
  }
});

// @desc    Mettre à jour le statut du paiement de la commande
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = expressAsyncHandler(async (req, res) => {
  //On récupére la commande et on y ajoute le nom et l'email de l'utilisateur qui a passé la commande
  const order = await Order.findById(req.params.id);
  try {
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else
      res.status(404).json({
        message: "La commande specifie n'existe pas.",
      });
  } catch (err) {
    console.log(err.message);
  }
});

// @desc    Récupère les commandes d'un utilisateur
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });

  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
