import Branch from "../models/Branch";
import Item from "../models/Item";
import User from "../models/User";
import Sale from "../models/Sales";
import Purchase from "../models/Purchase";
import RequestModel from "../models/Request";
import bcrypt from "bcryptjs";

export const seedAllData = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await Promise.all([
      Branch.deleteMany({}),
      Item.deleteMany({}),
      User.deleteMany({}),
      Sale.deleteMany({}),
      Purchase.deleteMany({}),
      RequestModel.deleteMany({})
    ]);

    console.log("🧹 Cleared existing data");

    // 1. Create Branches
    const branches = await Branch.create([
      {
        name: "Downtown Branch",
        address: "123 Main St, Downtown"
      },
      {
        name: "North Branch",
        address: "456 North Ave, North District"
      },
      {
        name: "South Branch",
        address: "789 South Blvd, South District"
      },
      {
        name: "East Branch",
        address: "321 East Rd, East District"
      }
    ]);

    console.log("🏢 Created branches:", branches.length);

    // 2. Create Items
    const items = await Item.create([
      {
        name: "LED Light Bulb",
        unit: "pieces",
        stock: 150,
        lowStockLevel: 20,
        price: 15.99
      },
      {
        name: "Extension Cord",
        unit: "pieces",
        stock: 75,
        lowStockLevel: 10,
        price: 24.99
      },
      {
        name: "Power Strip",
        unit: "pieces",
        stock: 50,
        lowStockLevel: 8,
        price: 19.99
      },
      {
        name: "Wall Outlet",
        unit: "pieces",
        stock: 200,
        lowStockLevel: 25,
        price: 8.99
      },
      {
        name: "Circuit Breaker",
        unit: "pieces",
        stock: 3, // Low stock - below threshold of 5
        lowStockLevel: 5,
        price: 45.99
      },
      {
        name: "Wire Cable (50ft)",
        unit: "rolls",
        stock: 2, // Low stock - below threshold of 3
        lowStockLevel: 3,
        price: 89.99
      },
      {
        name: "Electrical Tape",
        unit: "rolls",
        stock: 100,
        lowStockLevel: 15,
        price: 4.99
      },
      {
        name: "Multimeter",
        unit: "pieces",
        stock: 1, // Low stock - below threshold of 2
        lowStockLevel: 2,
        price: 79.99
      },
      {
        name: "Voltage Tester",
        unit: "pieces",
        stock: 4, // Low stock - below threshold of 5
        lowStockLevel: 5,
        price: 34.99
      },
      {
        name: "Wire Strippers",
        unit: "pieces",
        stock: 6, // Low stock - below threshold of 8
        lowStockLevel: 8,
        price: 12.99
      }
    ]);

    console.log("📦 Created items:", items.length, `(including ${items.filter(item => item.stock <= item.lowStockLevel).length} low stock items)`);

    // 3. Create Users
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = await User.create([
      {
        name: "Admin User",
        email: "admin12@yopmail.com",
        password: hashedPassword,
        role: "admin"
      },
      {
        name: "John Smith",
        email: "john@electric.com",
        password: hashedPassword,
        role: "branch",
        branchId: branches[0]._id
      },
      {
        name: "Sarah Johnson",
        email: "sarah@electric.com",
        password: hashedPassword,
        role: "branch",
        branchId: branches[1]._id
      },
      {
        name: "Mike Davis",
        email: "mike@electric.com",
        password: hashedPassword,
        role: "branch",
        branchId: branches[2]._id
      },
      {
        name: "Lisa Brown",
        email: "lisa@electric.com",
        password: hashedPassword,
        role: "branch",
        branchId: branches[3]._id
      }
    ]);

    console.log("👥 Created users:", users.length);

    // 4. Create Sales
    const sales = await Sale.create([
      {
        branchId: branches[0]._id,
        itemsSold: [
          { itemId: items[0]._id, quantity: 5 },
          { itemId: items[1]._id, quantity: 2 }
        ],
        totalAmount: 109.93,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        branchId: branches[0]._id,
        itemsSold: [
          { itemId: items[2]._id, quantity: 3 },
          { itemId: items[6]._id, quantity: 1 }
        ],
        totalAmount: 64.96,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        branchId: branches[1]._id,
        itemsSold: [
          { itemId: items[3]._id, quantity: 10 },
          { itemId: items[4]._id, quantity: 1 }
        ],
        totalAmount: 134.89,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        branchId: branches[2]._id,
        itemsSold: [
          { itemId: items[5]._id, quantity: 1 },
          { itemId: items[7]._id, quantity: 1 }
        ],
        totalAmount: 169.98,
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
      },
      {
        branchId: branches[3]._id,
        itemsSold: [
          { itemId: items[0]._id, quantity: 8 },
          { itemId: items[2]._id, quantity: 2 }
        ],
        totalAmount: 151.94,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      }
    ]);

    console.log("💰 Created sales:", sales.length);

    // 5. Create Purchases
    const purchases = await Purchase.create([
      {
        itemId: items[0]._id,
        quantity: 100,
        cost: 1200.00,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 1 week ago
      },
      {
        itemId: items[1]._id,
        quantity: 50,
        cost: 1000.00,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
      },
      {
        itemId: items[2]._id,
        quantity: 30,
        cost: 450.00,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        itemId: items[3]._id,
        quantity: 150,
        cost: 900.00,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
      }
    ]);

    console.log("📥 Created purchases:", purchases.length);

    // 6. Create Requests
    const requests = await RequestModel.create([
      {
        branchId: branches[0]._id,
        itemId: items[4]._id,
        quantity: 5,
        status: "pending",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        branchId: branches[1]._id,
        itemId: items[5]._id,
        quantity: 3,
        status: "approved",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        branchId: branches[2]._id,
        itemId: items[7]._id,
        quantity: 2,
        status: "declined",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
      },
      {
        branchId: branches[3]._id,
        itemId: items[6]._id,
        quantity: 20,
        status: "pending",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      }
    ]);

    console.log("📋 Created requests:", requests.length);

    console.log("✅ Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   Branches: ${branches.length}`);
    console.log(`   Items: ${items.length}`);
    console.log(`   Users: ${users.length}`);
    console.log(`   Sales: ${sales.length}`);
    console.log(`   Purchases: ${purchases.length}`);
    console.log(`   Requests: ${requests.length}`);

    console.log("\n🔐 Login Credentials:");
    console.log("   Admin: admin12@yopmail.com / password123");
    console.log("   Branch Users: [name]@electric.com / password123");
    console.log("   (John, Sarah, Mike, Lisa)");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
};