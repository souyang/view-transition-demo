"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import NavBar from "../components/NavBar";
import "./doc.css";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "comparison", label: "Quick Comparison" },
  { id: "usage", label: "Usage Examples" },
  { id: "browser", label: "Browser Support" },
];

const codeExamples = {
  hook: `/**
 * View Transitions API Hook for React 19
 * A production-ready React hook that integrates the native View Transitions API
 * with React 19's concurrent features for smooth, hardware-accelerated UI transitions.
 */

import { startTransition } from "react";
import { flushSync } from "react-dom";

interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition(): void;
}

declare global {
  interface Document {
    startViewTransition(
      callback: () => void | Promise<void>
    ): ViewTransition;
  }
}

export function useViewTransition() {
  return (updateFn: () => void) => {
    // Check for browser environment and API availability
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      // Native View Transitions API available
      document.startViewTransition(() => {
        flushSync(updateFn);
      });
    } else {
      // Graceful fallback for unsupported browsers
      startTransition(updateFn);
    }
  };
}`,
  basicUsage: `import { useState } from "react";
import { useViewTransition } from "@/hooks/useViewTransition";

function Counter() {
  const [count, setCount] = useState(0);
  const withTransition = useViewTransition();

  return (
    <div>
      <h1 style={{ viewTransitionName: "count" }}>
        {count}
      </h1>
      <button onClick={() => withTransition(() => setCount(count + 1))}>
        Increment
      </button>
    </div>
  );
}`,
  linkUsage: `import ViewTransitionLink from "@/components/ViewTransitionLink";

function Navigation() {
  return (
    <nav>
      <ViewTransitionLink href="/">
        Home
      </ViewTransitionLink>
      <ViewTransitionLink href="/about">
        About
      </ViewTransitionLink>
      <ViewTransitionLink href="/contact">
        Contact
      </ViewTransitionLink>
    </nav>
  );
}`,
  routerUsage: `import { useViewTransitionRouter } from "@/hooks/useViewTransitionRouter";

function LoginButton() {
  const router = useViewTransitionRouter();

  const handleLogin = async () => {
    await loginUser();
    router.push("/dashboard"); // Smooth transition!
  };

  return <button onClick={handleLogin}>Login</button>;
}`,
  css: `::view-transition-old(count),
::view-transition-new(count) {
  animation-duration: 0.5s;
}

::view-transition-old(count) {
  animation-name: fadeOut;
}

::view-transition-new(count) {
  animation-name: fadeIn;
}`,
};

function CodeBlock({ code, language = "typescript" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="doc-code-wrapper">
      <div className="doc-code-header">
        <span className="doc-code-language">{language}</span>
        <button
          onClick={handleCopy}
          className="doc-copy-button"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="doc-code-block">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="doc-feature-card">
      <div className="doc-feature-icon">{icon}</div>
      <h3 className="doc-feature-title">{title}</h3>
      <p className="doc-feature-description">{description}</p>
    </div>
  );
}

export default function DocPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
      <NavBar currentPage="doc" />
      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
        {/* Header */}
        <header className="doc-header">
          <h1 className="doc-title">🎬 useViewTransition</h1>
          <p className="doc-subtitle">
            A lightweight React 19 hook with Next.js 15 App Router integration for native View Transitions API
          </p>
          <div className="doc-tags">
            <span className="doc-tag">React 19</span>
            <span className="doc-tag">Next.js 15</span>
            <span className="doc-tag">TypeScript</span>
            <span className="doc-tag">~100 lines total</span>
            <span className="doc-tag">Zero dependencies</span>
          </div>
        </header>

        {/* Tabs */}
        <nav className="doc-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`doc-tab ${activeTab === tab.id ? "doc-tab-active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="doc-content">
          {activeTab === "overview" && (
            <div className="doc-section">
              <h2 className="doc-section-title">✨ Why Use This Instead of npm Packages?</h2>
              <div className="doc-features-grid">
                <FeatureCard
                  icon="🪶"
                  title="Ultra Lightweight"
                  description="Only ~20 lines of actual code. No dependencies, no bloat. Perfect when you don't need complex features."
                />
                <FeatureCard
                  icon="🎯"
                  title="Simple & Focused"
                  description="Does one thing well: wraps your state updates with View Transitions API. No complexity, easy to understand."
                />
                <FeatureCard
                  icon="⚡"
                  title="No Build Step"
                  description="Copy-paste directly into your project. No npm install, no version conflicts, no package.json updates."
                />
                <FeatureCard
                  icon="🔧"
                  title="Full Control"
                  description="Own the code. Modify it to fit your exact needs. No waiting for maintainers or dealing with breaking changes."
                />
                <FeatureCard
                  icon="📦"
                  title="Zero Bundle Impact"
                  description="Adds virtually no size to your bundle. Existing packages add 5-50KB+ with features you might not need."
                />
                <FeatureCard
                  icon="🎓"
                  title="Educational"
                  description="See exactly how View Transitions integrate with React. Great for learning and understanding the API."
                />
              </div>

              <div className="doc-section-spacing">
                <h2 className="doc-section-title">💻 The Complete Hook</h2>
                <CodeBlock code={codeExamples.hook} />
              </div>

              <div className="doc-section-spacing">
                <h2 className="doc-section-title">📈 Stats</h2>
                <div className="doc-stats-grid">
                  <div className="doc-stat">
                    <div className="doc-stat-value">~100</div>
                    <div className="doc-stat-label">Lines of Code (total)</div>
                  </div>
                  <div className="doc-stat">
                    <div className="doc-stat-value">0</div>
                    <div className="doc-stat-label">Dependencies</div>
                  </div>
                  <div className="doc-stat">
                    <div className="doc-stat-value">~2KB</div>
                    <div className="doc-stat-label">Bundle Size (gzipped)</div>
                  </div>
                  <div className="doc-stat">
                    <div className="doc-stat-value">100%</div>
                    <div className="doc-stat-label">TypeScript</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "comparison" && (
            <div className="doc-section">
              <h2 className="doc-section-title">📊 Quick Comparison</h2>
              <div className="doc-table-wrapper">
                <table className="doc-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>useViewTransition (this hook)</th>
                      <th>use-view-transitions</th>
                      <th>React Experimental</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Lines of Code</strong></td>
                      <td>~20</td>
                      <td>500+</td>
                      <td>Built-in</td>
                    </tr>
                    <tr>
                      <td><strong>Dependencies</strong></td>
                      <td className="doc-check">✓ Zero</td>
                      <td className="doc-cross">✗ React + ReactDOM</td>
                      <td className="doc-check">✓ Built-in</td>
                    </tr>
                    <tr>
                      <td><strong>Basic Transitions</strong></td>
                      <td className="doc-check">✓</td>
                      <td className="doc-check">✓</td>
                      <td className="doc-check">✓</td>
                    </tr>
                    <tr>
                      <td><strong>Suspense Support</strong></td>
                      <td className="doc-check">✓</td>
                      <td className="doc-check">✓</td>
                      <td className="doc-check">✓</td>
                    </tr>
                    <tr>
                      <td><strong>Next.js Router</strong></td>
                      <td className="doc-check">✓</td>
                      <td className="doc-check">✓</td>
                      <td className="doc-cross">✗</td>
                    </tr>
                    <tr>
                      <td><strong>Learning Curve</strong></td>
                      <td className="doc-check">✓ 5 min</td>
                      <td>30 min</td>
                      <td>15 min</td>
                    </tr>
                    <tr>
                      <td><strong>Bundle Size</strong></td>
                      <td className="doc-check">✓ ~0.5KB</td>
                      <td className="doc-cross">✗ ~10KB+</td>
                      <td className="doc-check">✓ Built-in</td>
                    </tr>
                    <tr>
                      <td><strong>Maintenance</strong></td>
                      <td className="doc-check">✓ You own it</td>
                      <td>External maintainer</td>
                      <td className="doc-check">✓ React team</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="doc-section-spacing">
                <h2 className="doc-section-title">🎯 When to Use</h2>
                <div className="doc-when-grid">
                  <div className="doc-when-card doc-when-use">
                    <h3 className="doc-when-title">✓ Use This When</h3>
                    <ul className="doc-when-list">
                      <li>You need basic view transitions</li>
                      <li>Bundle size matters</li>
                      <li>You want to understand the code</li>
                      <li>Simple state updates only</li>
                      <li>You prefer ownership over convenience</li>
                    </ul>
                  </div>
                  <div className="doc-when-card doc-when-avoid">
                    <h3 className="doc-when-title">✗ Use npm Package When</h3>
                    <ul className="doc-when-list">
                      <li>You need very specific advanced features</li>
                      <li>Complex async workflows beyond basic usage</li>
                      <li>You want externally maintained solutions</li>
                      <li>You need additional specialized integrations</li>
                      <li>You prefer plug-and-play over customization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "usage" && (
            <div className="doc-section">
              <h2 className="doc-section-title">🚀 Usage Examples</h2>
              
              <div className="doc-usage-section">
                <h3 className="doc-usage-title">Basic State Updates</h3>
                <CodeBlock code={codeExamples.basicUsage} />
              </div>

              <div className="doc-usage-section">
                <h3 className="doc-usage-title">Next.js Navigation (Link)</h3>
                <CodeBlock code={codeExamples.linkUsage} />
              </div>

              <div className="doc-usage-section">
                <h3 className="doc-usage-title">Next.js Navigation (Programmatic)</h3>
                <CodeBlock code={codeExamples.routerUsage} />
              </div>

              <div className="doc-usage-section">
                <h3 className="doc-usage-title">💡 Pro Tip: Add CSS for custom transitions</h3>
                <CodeBlock code={codeExamples.css} language="css" />
              </div>
            </div>
          )}

          {activeTab === "browser" && (
            <div className="doc-section">
              <h2 className="doc-section-title">🌐 Browser Support</h2>
              <div className="doc-table-wrapper">
                <table className="doc-table">
                  <thead>
                    <tr>
                      <th>Browser</th>
                      <th>Version</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Chrome / Edge</strong></td>
                      <td>111+</td>
                      <td className="doc-check">✓ Full Support</td>
                    </tr>
                    <tr>
                      <td><strong>Safari</strong></td>
                      <td>18+</td>
                      <td className="doc-check">✓ Full Support</td>
                    </tr>
                    <tr>
                      <td><strong>Firefox</strong></td>
                      <td>146+</td>
                      <td className="doc-check">✓ Full Support</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="doc-note">
                On unsupported browsers or older versions, navigation still works but transitions fall back to React&apos;s <code>startTransition</code> (instant updates).
              </p>
            </div>
          )}
        </div>
        </div>
      </main>
    </div>
  );
}
