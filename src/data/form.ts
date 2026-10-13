/**
 * ============================================================================
 * ENQUIRY FORM DELIVERY CONFIG
 * ============================================================================
 *
 * A static site cannot process form submissions by itself. This site supports
 * three modes and picks one automatically:
 *
 *   1. "endpoint"  → POST to a third-party form service (Formspree, Web3Forms,
 *                    Basin, Getform, Cloudflare Worker, etc.). Set `endpoint`
 *                    to the service URL. If your service needs a public access
 *                    key inside the form body, also set `accessKey`
 *                    (these keys are designed to be public — never put a SECRET
 *                    here).
 *   2. "mailto"    → Opens the visitor's email app pre-filled with their
 *                    enquiry. Requires a verified enquiry email in site.ts.
 *   3. "disabled"  → Nothing is connected yet. The form is shown with a clear
 *                    notice and does NOT pretend to deliver. Configure one of
 *                    the options above to enable real delivery.
 *
 * OWNER-TODO: choose a delivery method and fill in the values below.
 * Full instructions are in README.md ("Connecting the enquiry form").
 *
 * SECURITY: never place private API keys or SMTP credentials in this file —
 * it is shipped to the browser.
 */
import { site } from "./site";

export type FormMode = "endpoint" | "mailto" | "disabled";

/** Set this to your form service URL to enable real delivery. */
const endpoint = "";

/** Optional PUBLIC access key required by some services (e.g. Web3Forms). */
const accessKey = "";

/** Enquiry destination (only valid once the email is verified in site.ts). */
const toEmail = site.contact.email.verified ? site.contact.email.value : "";

export const formConfig = {
  mode: (endpoint ? "endpoint" : toEmail ? "mailto" : "disabled") as FormMode,
  endpoint,
  accessKey,
  toEmail,
  successMessage:
    "Thank you — your enquiry has been sent. We will review your project details and respond shortly.",
  mailtoMessage:
    "Your email application should now open with your enquiry pre-filled. Please press send to deliver it to our team.",
  disabledMessage:
    "Online form delivery is not connected on this site yet. Please contact us directly using the details on this page, or ask the site owner to configure form delivery (see README).",
} as const;
