import { useEffect, useState } from "react";
import { links } from "../data/site";

/**
 * Checks whether the CV PDF has actually been deployed to /public.
 * Dev servers and SPA rewrites answer unknown paths with index.html (200),
 * so we check the content type rather than the status alone.
 *
 * Returns "checking" | "available" | "missing".
 */
export function useCvAvailability() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;
    fetch(links.cv, { method: "HEAD", cache: "no-store" })
      .then((res) => {
        const type = res.headers.get("content-type") || "";
        if (!cancelled) setStatus(res.ok && type.includes("pdf") ? "available" : "missing");
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return status;
}
