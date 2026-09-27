import React from "react";
import { Globe, Layers, Terminal, Zap, Package, GitMerge } from "lucide-react";
// Naya CodeBlock import kar liya
import CodeBlock from "../components/codeblock";

export const reactCourseData = [
  {
    category: "1. Origins & Setup",
    icon: Globe,
    lessons: [
      {
        id: "history-of-react",
        title: "The History: Why React?",
        toc: [
          { id: "who-created-react", label: "Who Created React?" },
          { id: "the-problem", label: "The Core Problem" },
          { id: "the-solution", label: "The Virtual DOM Solution" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <p className="text-xl text-slate-300">
              To truly master React, you must first understand the environment
              that birthed it. React was not created just to be another
              framework; it was engineered to solve a massive, specific scaling
              problem at one of the world's largest tech companies.
            </p>

            <h2
              id="who-created-react"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Who Created React?
            </h2>
            <p>
              React was created by <strong>Jordan Walke</strong>, a software
              engineer at Facebook. He released an early prototype called
              "FaxJS" in 2011. It was first deployed on Facebook's News Feed in
              2011 and later on Instagram in 2012. Facebook officially
              open-sourced React at JSConf US in May 2013.
            </p>

            <h2
              id="the-problem"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              The Core Problem: Cascading DOM Updates
            </h2>
            <p>
              Before React, developers used libraries like jQuery or frameworks
              like AngularJS. Facebook's application was growing incredibly
              complex, specifically the Ads system and chat notifications.
            </p>
            <ul className="space-y-3 mt-4">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">
                  &times;
                </span>
                <span>
                  <strong>The UI State Nightmare:</strong> Whenever new data
                  arrived (like a new chat message), tracking which exact HTML
                  element needed updating became a tangled mess of spaghetti
                  code.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">
                  &times;
                </span>
                <span>
                  <strong>Slow DOM Manipulation:</strong> Traditional browsers
                  are highly inefficient when you constantly tell them to
                  rebuild the actual DOM tree. It caused massive performance
                  bottlenecks.
                </span>
              </li>
            </ul>

            <h2
              id="the-solution"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              The Virtual DOM Solution
            </h2>
            <p>
              Jordan Walke realised that instead of manually manipulating the
              browser's DOM, developers should just declare what the UI{" "}
              <em>should</em> look like. React introduced the{" "}
              <strong>Virtual DOM</strong>. It keeps a lightweight copy of the
              UI in memory. When data changes, React compares the new Virtual
              DOM with the old one (a process called <em>Reconciliation</em>),
              calculates the absolute minimum number of changes required, and
              updates the real browser DOM in one rapid batch.
            </p>
          </div>
        ),
      },
      {
        id: "environment-setup",
        title: "Environment Setup (Vite)",
        toc: [
          { id: "installing-nodejs", label: "Installing Node.js" },
          { id: "creating-project", label: "Creating a Vite Project" },
          { id: "folder-structure", label: "Folder Structure" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <p className="text-xl text-slate-300">
              Modern React development has moved away from the legacy{" "}
              <code>create-react-app</code>. To engineer high-performance
              applications, the industry standard is now <strong>Vite</strong>.
            </p>

            <h2
              id="installing-nodejs"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Installing Node.js
            </h2>
            <p>
              Before installing React, you must install Node.js. Node provides
              the runtime environment and the npm (Node Package Manager) tool
              required to download React and its dependencies. Download the LTS
              version from the official Node.js website.
            </p>

            <h2
              id="creating-project"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Creating a Vite Project
            </h2>
            <p>
              Open your terminal and run the following command to initialise a
              new React project using Vite:
            </p>

            <CodeBlock 
              language="bash" 
              code={`npm create vite@latest codelume-app -- --template react`} 
            />

            <p className="mt-4">
              Once the project is generated, navigate into the folder, install
              the dependencies, and start the local development server:
            </p>

            <CodeBlock 
              language="bash" 
              code={`cd codelume-app\nnpm install\nnpm run dev`} 
            />

            <h2
              id="folder-structure"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Folder Structure
            </h2>
            <p>
              Vite generates a clean folder structure. The most important files
              are:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>
                <strong>index.html:</strong> The single HTML file where your
                entire React app is injected.
              </li>
              <li>
                <strong>src/main.jsx:</strong> The entry point of your
                application. It mounts the React app to the DOM.
              </li>
              <li>
                <strong>src/App.jsx:</strong> Your root component. You will
                build your UI hierarchy starting from here.
              </li>
            </ul>
          </div>
        ),
      },
    ],
  },
  {
    category: "2. React Core Architecture",
    icon: Layers,
    lessons: [
      {
        id: "jsx-deep-dive",
        title: "JSX Under the Hood",
        toc: [
          { id: "what-is-jsx", label: "What is JSX?" },
          { id: "jsx-rules", label: "The Strict Rules of JSX" },
          { id: "jsx-expressions", label: "Embedding JavaScript" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="what-is-jsx"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              What is JSX?
            </h2>
            <p>
              JSX stands for JavaScript XML. It is a syntax extension for
              JavaScript that allows you to write HTML-like markup inside a
              JavaScript file. Browsers do not understand JSX. Behind the
              scenes, tools like Babel compile JSX down to standard{" "}
              <code>React.createElement()</code> function calls.
            </p>

            <h2
              id="jsx-rules"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              The Strict Rules of JSX
            </h2>
            <ul className="space-y-3 mt-4">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold shrink-0 mt-0.5">
                  1.
                </span>
                <span>
                  <strong>Return a single root element:</strong> To return
                  multiple elements from a component, wrap them with a single
                  parent tag or a Fragment <code>&lt;&gt;...&lt;/&gt;</code>.
                  React needs a single root node to build the Virtual DOM tree.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold shrink-0 mt-0.5">
                  2.
                </span>
                <span>
                  <strong>Close all the tags:</strong> JSX requires tags to be
                  explicitly closed, e.g., <code>&lt;img /&gt;</code> instead of
                  just <code>&lt;img&gt;</code>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold shrink-0 mt-0.5">
                  3.
                </span>
                <span>
                  <strong>camelCase all properties:</strong> Since JSX turns
                  into JavaScript, attributes like <code>class</code> become{" "}
                  <code>className</code> (because <code>class</code> is a
                  reserved JS keyword), and <code>onclick</code> becomes{" "}
                  <code>onClick</code>.
                </span>
              </li>
            </ul>

            <h2
              id="jsx-expressions"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Embedding JavaScript
            </h2>
            <p>
              You can embed any valid JavaScript expression inside JSX by
              wrapping it in curly braces <code>{}</code>.
            </p>
            <CodeBlock 
              language="jsx" 
              code={`const name = "CodeLume";\nconst isLive = true;\n\nreturn (\n  <div>\n    <h1>Welcome to {name}</h1>\n    <p>Status: {isLive ? "Online" : "Offline"}</p>\n  </div>\n);`} 
            />
          </div>
        ),
      },
      {
        id: "components-props",
        title: "Components & Props",
        toc: [
          { id: "functional-components", label: "Functional Components" },
          { id: "passing-props", label: "Passing Props" },
          { id: "children-prop", label: "The children Prop" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <p className="text-xl text-slate-300">
              Components are the independent, reusable building blocks of a
              React application.
            </p>

            <h2
              id="functional-components"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Functional Components
            </h2>
            <p>
              Modern React exclusively uses functional components. A component
              is merely a JavaScript function that starts with a Capital Letter
              and returns JSX.
            </p>
            
            <CodeBlock 
              language="jsx" 
              code={`export default function Button() {\n  return (\n    <button className="bg-blue-600 text-white px-4 py-2 rounded">\n      Execute Process\n    </button>\n  );\n}`} 
            />

            <h2
              id="passing-props"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Passing & Destructuring Props
            </h2>
            <p>
              Props (properties) allow components to receive external data from
              their parents. Props are read-only; a child component cannot
              modify its own props. To optimise readability, we usually
              destructure props directly in the function signature.
            </p>
            
            <CodeBlock 
              language="jsx" 
              code={`// Parent Component\n<ProfileCard name="Rafay" role="Lead Engineer" />\n\n// Child Component\nexport default function ProfileCard({ name, role }) {\n  return (\n    <div className="card">\n      <h2>{name}</h2>\n      <p>{role}</p>\n    </div>\n  );\n}`} 
            />

            <h2
              id="children-prop"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              The children Prop
            </h2>
            <p>
              Sometimes you want a component to act as a "wrapper" or container
              for other dynamic content. React provides a special prop called{" "}
              <code>children</code> that captures whatever is placed between the
              component's opening and closing tags.
            </p>

            <CodeBlock 
              language="jsx" 
              code={`// Parent\n<CardWrapper>\n  <h2>Dynamic Content</h2>\n  <p>Inside the wrapper.</p>\n</CardWrapper>\n\n// Child Component\nexport default function CardWrapper({ children }) {\n  return (\n    <div className="border border-white/10 rounded-xl p-6">\n      {children}\n    </div>\n  );\n}`} 
            />
          </div>
        ),
      },
      {
        id: "lists-and-keys",
        title: "Rendering Lists & Keys",
        toc: [
          { id: "mapping-arrays", label: "Mapping over Arrays" },
          { id: "why-keys", label: "The Importance of Keys" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="mapping-arrays"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Mapping over Arrays
            </h2>
            <p>
              In React, we use the standard JavaScript <code>map()</code>{" "}
              function to transform an array of data into an array of JSX
              elements.
            </p>

            <CodeBlock 
              language="jsx" 
              code={`const technologies = ['React', 'Node.js', 'Express', 'MongoDB'];\n\nreturn (\n  <ul>\n    {technologies.map(tech => (\n      <li>{tech}</li>\n    ))}\n  </ul>\n);`} 
            />

            <h2
              id="why-keys"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              The Importance of Keys
            </h2>
            <p>
              If you run the code above, React will throw a warning in the
              console:{" "}
              <em>"Each child in a list should have a unique 'key' prop."</em>
            </p>
            <p>
              Keys help React identify which items have changed, are added, or
              are removed during the Reconciliation process. Keys should be
              stable, predictable, and unique (like a database ID). Do not use
              the array <code>index</code> as a key if the list items can be
              reordered, as it will lead to bugs.
            </p>

            <CodeBlock 
              language="jsx" 
              code={`// Correct Implementation\n{users.map(user => (\n  <li key={user.id}>{user.name}</li>\n))}`} 
            />
          </div>
        ),
      },
    ],
  },
  {
    category: "3. State & Reactivity",
    icon: Terminal,
    lessons: [
      {
        id: "usestate-hook",
        title: "Mastering useState",
        toc: [
          { id: "what-is-state", label: "What is State?" },
          { id: "declaring-state", label: "Declaring State Variables" },
          { id: "async-nature", label: "The Asynchronous Nature of State" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="what-is-state"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              What is State?
            </h2>
            <p>
              Standard JavaScript variables do not trigger a UI update when they
              change. State is a special React memory reserved for variables
              that must cause the component to re-render immediately upon
              changing.
            </p>

            <h2
              id="declaring-state"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Declaring State Variables
            </h2>

            <CodeBlock 
              language="jsx" 
              code={`import { useState } from 'react';\n\nexport default function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count is: {count}\n    </button>\n  );\n}`} 
            />
            
            <p className="mt-4">
              The <code>useState</code> hook returns an array with two values:
              the current state, and a setter function to update it.
            </p>

            <h2
              id="async-nature"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              The Asynchronous Nature of State
            </h2>
            <p>
              React batches state updates for performance. Calling a state
              setter does not update the state variable immediately; it
              schedules a re-render.
            </p>
            <p>
              If you need to update state based on the previous state (e.g.,
              incrementing a counter rapidly), always pass a callback function
              to the setter:
            </p>

            <CodeBlock 
              language="javascript" 
              code={`// Unsafe (Might drop updates if batched)\nsetCount(count + 1);\n\n// Safe (Always uses the latest previous state)\nsetCount(prevCount => prevCount + 1);`} 
            />
          </div>
        ),
      },
      {
        id: "useeffect-hook",
        title: "Side Effects with useEffect",
        toc: [
          { id: "managing-effects", label: "Managing External Systems" },
          { id: "dependency-array", label: "The Dependency Array" },
          { id: "cleanup-function", label: "The Cleanup Function" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="managing-effects"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Managing External Systems
            </h2>
            <p>
              React components are supposed to be pure functions (same input =
              same output). However, components need to connect to external
              systems: fetching API data, establishing WebSocket connections, or
              listening to browser window events. The <code>useEffect</code>{" "}
              hook lets you execute this "side effect" code after the component
              renders.
            </p>

            <h2
              id="dependency-array"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              The Dependency Array
            </h2>
            <p>
              The second argument to <code>useEffect</code> is the dependency
              array. It dictates when the effect should re-run.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-300">
              <li>
                <code>{`useEffect(() => {...})`}</code> — No array: Runs on
                every render (High risk of infinite loops).
              </li>
              <li>
                <code>{`useEffect(() => {...}, [])`}</code> — Empty array: Runs
                exactly once when the component mounts.
              </li>
              <li>
                <code>{`useEffect(() => {...}, [userId])`}</code> — Array with
                variables: Runs on mount AND whenever <code>userId</code>{" "}
                changes.
              </li>
            </ul>

            <h2
              id="cleanup-function"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              The Cleanup Function
            </h2>
            <p>
              If your effect sets up a subscription or a timer, you must clean
              it up to prevent memory leaks. You do this by returning a function
              from within the effect. React will run this cleanup function
              before the component unmounts or before the effect runs again.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`useEffect(() => {\n  const timer = setInterval(() => {\n    console.log("Tick");\n  }, 1000);\n\n  // Cleanup function\n  return () => {\n    clearInterval(timer);\n  };\n}, []);`} 
            />
          </div>
        ),
      },
    ],
  },
  {
    category: "4. Advanced Hooks",
    icon: Zap,
    lessons: [
      {
        id: "useref",
        title: "Direct DOM Access (useRef)",
        toc: [
          { id: "what-is-useref", label: "What is useRef?" },
          { id: "dom-manipulation", label: "Accessing DOM Elements" },
          { id: "storing-values", label: "Storing Mutable Values" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="what-is-useref"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              What is useRef?
            </h2>
            <p>
              <code>useRef</code> is a hook that allows you to directly
              reference a DOM element or store a mutable value that does{" "}
              <strong>not</strong> cause a re-render when updated.
            </p>

            <h2
              id="dom-manipulation"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Accessing DOM Elements
            </h2>
            <p>
              In vanilla JS, you use <code>document.getElementById()</code>. In
              React, you use refs to target elements.
            </p>

            <CodeBlock 
              language="jsx" 
              code={`import { useRef } from 'react';\n\nexport default function FocusInput() {\n  const inputRef = useRef(null);\n\n  const handleFocus = () => {\n    inputRef.current.focus();\n  };\n\n  return (\n    <>\n      <input ref={inputRef} type="text" />\n      <button onClick={handleFocus}>Focus Input</button>\n    </>\n  );\n}`} 
            />

            <h2
              id="storing-values"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Storing Mutable Values (Without Re-rendering)
            </h2>
            <p>
              If you need to keep track of a value (like a timer ID or previous
              state) but you don't want the UI to update when that value
              changes, <code>useRef</code> is perfect. Changing{" "}
              <code>ref.current</code> is completely silent to React's rendering
              engine.
            </p>
          </div>
        ),
      },
      {
        id: "custom-hooks",
        title: "Building Custom Hooks",
        toc: [
          { id: "why-custom-hooks", label: "Why Custom Hooks?" },
          { id: "usefetch-example", label: "Creating useFetch" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="why-custom-hooks"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Why Custom Hooks?
            </h2>
            <p>
              When you have logic that uses state and effects that you want to
              reuse across multiple components (like fetching data, tracking
              window width, or checking online status), you can extract that
              logic into a Custom Hook. Custom Hooks are just JavaScript
              functions whose names start with <code>use</code>.
            </p>

            <h2
              id="usefetch-example"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Creating a useFetch Hook
            </h2>
            <p>Here is an industry-standard custom hook for API calls:</p>

            <CodeBlock 
              language="javascript" 
              code={`import { useState, useEffect } from 'react';\n\nexport function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const fetchData = async () => {\n      try {\n        const response = await fetch(url);\n        const json = await response.json();\n        setData(json);\n      } catch (err) {\n        setError(err);\n      } finally {\n        setLoading(false);\n      }\n    };\n    fetchData();\n  }, [url]);\n\n  return { data, loading, error };\n}`} 
            />

            <p className="mt-4">Now, any component can consume this easily:</p>

            <CodeBlock 
              language="javascript" 
              code={`const { data, loading, error } = useFetch('https://api.example.com/users');`} 
            />
          </div>
        ),
      },
    ],
  },
  {
    category: "5. State Management Architecture",
    icon: Package,
    lessons: [
      {
        id: "context-api",
        title: "Global State (Context API)",
        toc: [
          { id: "prop-drilling", label: "The Prop Drilling Problem" },
          { id: "implementing-context", label: "Implementing Context" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="prop-drilling"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              The Prop Drilling Problem
            </h2>
            <p>
              Passing props deeply through multiple intermediate components that
              don't need the data themselves is called "prop drilling". It
              creates brittle, tightly coupled architecture. The Context API
              solves this by acting like a global portal, teleporting data
              directly to the components that request it.
            </p>

            <h2
              id="implementing-context"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Implementing Context
            </h2>

            <CodeBlock 
              language="jsx" 
              code={`import { createContext, useContext, useState } from 'react';\n\n// 1. Create Context\nconst ThemeContext = createContext();\n\n// 2. Create Provider Component\nexport function ThemeProvider({ children }) {\n  const [theme, setTheme] = useState('dark');\n  return (\n    <ThemeContext.Provider value={{ theme, setTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}\n\n// 3. Consume anywhere in the app\nexport default function Navbar() {\n  const { theme, setTheme } = useContext(ThemeContext);\n  return (\n    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>\n      Toggle Theme\n    </button>\n  );\n}`} 
            />
          </div>
        ),
      },
    ],
  },
  {
    category: "6. Performance Optimisation",
    icon: GitMerge,
    lessons: [
      {
        id: "memoization",
        title: "useMemo & useCallback",
        toc: [
          { id: "react-rendering", label: "How React Renders" },
          { id: "usememo", label: "Caching Computations (useMemo)" },
          { id: "usecallback", label: "Caching Functions (useCallback)" },
        ],
        content: (
          <div className="space-y-6 text-[#94a3b8] leading-relaxed text-[16px]">
            <h2
              id="react-rendering"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              How React Renders
            </h2>
            <p>
              Whenever a parent component's state changes, React re-renders that
              component <strong>and all of its child components</strong> by
              default. In large apps, this can cause massive lag.
            </p>

            <h2
              id="usememo"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Caching Computations (useMemo)
            </h2>
            <p>
              If your component performs complex mathematical operations or
              filters massive arrays, you should cache the result using{" "}
              <code>useMemo</code> so it doesn't recalculate on every unrelated
              render.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`const filteredData = useMemo(() => {\n  return massiveArray.filter(item => item.id === targetId);\n}, [targetId, massiveArray]);`} 
            />

            <h2
              id="usecallback"
              className="text-2xl font-bold text-white mt-10 mb-4 scroll-mt-24"
            >
              Caching Functions (useCallback)
            </h2>
            <p>
              Whenever a component re-renders, all inline functions are
              recreated in memory. If you pass these functions down as props to
              heavily optimised child components, the child will think the prop
              changed and re-render anyway. Wrap the function in{" "}
              <code>useCallback</code> to retain the exact same function
              reference between renders.
            </p>

            <CodeBlock 
              language="javascript" 
              code={`const handleSubmit = useCallback((data) => {\n  postToServer(data);\n}, []);`} 
            />
          </div>
        ),
      },
    ],
  },
];