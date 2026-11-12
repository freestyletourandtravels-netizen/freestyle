/**
 * Smooth page transition on every navigation. A template re-mounts on each
 * route change, so this CSS fade replays without shipping extra JavaScript
 * and without hiding server-rendered content before hydration.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
