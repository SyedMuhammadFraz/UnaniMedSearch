const Order = require("../models/Order");
const Medicine = require("../models/Medicine");

exports.placeOrder = async (req, res) => {

  try {
    const { user, medicines, postalAddress } = req.body;

    // Fetch medicine details
    const medicineIds = medicines.map((m) => m.medicineId);
    const medicineDocs = await Medicine.find({ _id: { $in: medicineIds } });

    // Create a map of medicine ID to price
    const priceMap = medicineDocs.reduce((map, medicine) => {
      map[medicine._id.toString()] = medicine.price; // Assuming `price` is a field in your Medicine model
      return map;
    }, {});

    // Calculate total amount
    let totalAmount = 0;
    for (const item of medicines) {
      const price = priceMap[item.medicineId];
      if (price) {
        totalAmount += price * item.quantity;
      }
    }

    // Create and save the order
    const newOrder = new Order({
      user,
      medicines,
      postalAddress,
      totalAmount,
    });
    const savedOrder = await newOrder.save();

    const userOrders = await Order.find({ user });

    res.status(201).json({
      message: "Order placed successfully",
      savedOrder,
      userOrders, // Return all orders placed by the user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const { user } = req.params; // Assuming userId is passed as a URL parameter

    console.log(`User: ${user}`);
    // Fetch all orders placed by the user
    const userOrders = await Order.find({ user: user });
    console.log(typeof userOrders);
    console.log(userOrders);

    if (!userOrders) {
      // Respond with a 404 if no orders are found
      return res.status(404).json({ message: "No orders found" });
    }

    if (!userOrders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json(userOrders);
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({ error: err.message });
  }
};
