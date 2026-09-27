import React from "react";
import { Database, FolderTree, Search } from "lucide-react";

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
              developers, offering immense flexibility and horizontal
              scalability.
            </p>

            <h2
              id="bson-documents"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              BSON Documents
            </h2>
            <p>
              Instead of storing data in rigid tables and rows like SQL
              databases, MongoDB stores data in flexible BSON (Binary JSON)
              documents. This means fields can vary from document to document,
              making data modelling incredibly adaptive.
            </p>

            <h2
              id="collections"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Understanding Collections
            </h2>
            <p>
              A collection is a grouping of MongoDB documents. It is the
              equivalent of a table in a relational database system. However, a
              collection does not enforce a strict schema unless you
              specifically configure it to do so.
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
              Mongoose is an Object Data Modelling (ODM) library for MongoDB and
              Node.js. It manages relationships between data, provides schema
              validation, and is used to translate between objects in code and
              the representation of those objects in MongoDB.
            </p>

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
            <div className="bg-[#0f172a] border border-white/5 rounded-xl p-5 font-mono text-sm mt-4 text-emerald-300 whitespace-pre overflow-x-auto">
              {`import mongoose from 'mongoose';\n\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, unique: true }\n});\n\nexport const User = mongoose.model('User', userSchema);`}
            </div>
          </div>
        ),
      },
    ],
  },
];
