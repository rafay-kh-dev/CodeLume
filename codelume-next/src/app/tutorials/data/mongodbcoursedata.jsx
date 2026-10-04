import React from "react";
import { Database, FolderTree, Save } from "lucide-react";
// Updated path for Next.js folder structure
import CodeBlock from "../../../components/codeblock";

export const mongodbCourseData = [
  {
    category: "1. NoSQL Fundamentals",
    icon: Database,
    lessons: [
      {
        id: "mongo-basics",
        title: "Documents & Collections",
        toc: [
          { id: "bson-documents", label: "BSON Documents" },
          { id: "collections", label: "Understanding Collections" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <p className="text-xl text-slate-300">
              MongoDB is a document database built for modern application
              developers. It completely bypasses the rigid table structures of
              SQL, offering immense flexibility and horizontal scalability.
            </p>

            <h2
              id="bson-documents"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              BSON Documents
            </h2>
            <p>
              Instead of storing data in tables and rows, MongoDB stores data in
              flexible BSON (Binary JSON) documents. This means fields can vary
              from document to document within the same database, making data
              modelling incredibly adaptive.
            </p>

            <CodeBlock
              language="json"
              code={`{\n  "_id": "60d5ec9af682fbd39a1b8a56",\n  "name": "CodeLume Agency",\n  "services": ["MERN Stack", "UI/UX", "SEO"],\n  "established": 2024\n}`}
            />

            <h2
              id="collections"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Understanding Collections
            </h2>
            <p>
              A collection is a grouping of MongoDB documents. It is the
              equivalent of a table in a relational database system. However, a
              collection does not enforce a strict schema natively. You can
              store a document with 3 fields next to a document with 20 fields.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    category: "2. Mongoose ODM",
    icon: FolderTree,
    lessons: [
      {
        id: "mongoose-schemas",
        title: "Schemas and Models",
        toc: [
          { id: "what-is-mongoose", label: "What is Mongoose?" },
          { id: "connecting-db", label: "Connecting to MongoDB" },
          { id: "defining-schemas", label: "Defining Schemas" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="what-is-mongoose"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              What is Mongoose?
            </h2>
            <p>
              While MongoDB's flexibility is powerful, large applications need
              predictability. Mongoose is an Object Data Modelling (ODM) library
              for MongoDB and Node.js. It forces a structured schema onto
              MongoDB, providing validation and relationships.
            </p>

            <h2
              id="connecting-db"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Connecting to MongoDB
            </h2>

            <CodeBlock
              language="javascript"
              code={`import mongoose from 'mongoose';\n\nconst connectDB = async () => {\n  try {\n    await mongoose.connect(process.env.MONGO_URI);\n    console.log('MongoDB successfully connected');\n  } catch (error) {\n    console.error('Database connection failed', error);\n    process.exit(1);\n  }\n};\n\nconnectDB();`}
            />

            <h2
              id="defining-schemas"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Defining Schemas
            </h2>
            <p>
              A Mongoose schema defines the structure of the document, default
              values, validators, and more. Once a schema is created, it is
              compiled into a Model, which provides the interface to query the
              database.
            </p>

            <CodeBlock
              language="javascript"
              code={`import mongoose from 'mongoose';\n\nconst userSchema = new mongoose.Schema({\n  username: {\n    type: String,\n    required: [true, 'Username is required'],\n    unique: true,\n    trim: true\n  },\n  role: {\n    type: String,\n    enum: ['user', 'admin'],\n    default: 'user'\n  }\n}, { timestamps: true }); // Automatically adds createdAt and updatedAt\n\nexport const User = mongoose.model('User', userSchema);`}
            />
          </div>
        ),
      },
    ],
  },
  {
    category: "3. Database Operations (CRUD)",
    icon: Save,
    lessons: [
      {
        id: "crud-operations",
        title: "Creating & Reading Data",
        toc: [
          { id: "creating", label: "Creating Documents" },
          { id: "reading", label: "Querying/Reading Data" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="creating"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Creating Documents
            </h2>
            <p>
              To insert data into your MongoDB database, you use your Mongoose
              Model and call the <code>.create()</code> or <code>.save()</code>{" "}
              method. This is an asynchronous operation.
            </p>

            <CodeBlock
              language="javascript"
              code={`// Creating a new user via API\napp.post('/api/users', async (req, res) => {\n  try {\n    const newUser = await User.create({\n      username: req.body.username,\n      role: req.body.role\n    });\n    res.status(201).json(newUser);\n  } catch (error) {\n    res.status(400).json({ error: error.message });\n  }\n});`}
            />

            <h2
              id="reading"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Querying/Reading Data
            </h2>
            <p>
              Mongoose provides rich querying capabilities. <code>find()</code>{" "}
              returns an array of documents, while <code>findOne()</code> or{" "}
              <code>findById()</code> returns a single document object.
            </p>

            <CodeBlock
              language="javascript"
              code={`// Fetch all admin users\nconst admins = await User.find({ role: 'admin' });\n\n// Fetch a user by specific ID\nconst specificUser = await User.findById('60d5ec9af682fbd39a1b8a56');\n\n// Check if user exists\nif (!specificUser) {\n  return res.status(404).json({ message: 'User not found' });\n}`}
            />
          </div>
        ),
      },
    ],
  },
];
