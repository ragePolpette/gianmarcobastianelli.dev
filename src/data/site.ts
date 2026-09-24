export const site = {
  name: 'Gianmarco Bastianelli',
  url: 'https://gianmarcobastianelli.dev',
  github: 'https://github.com/ragePolpette',
  linkedin: 'https://www.linkedin.com/in/gianmarco-bastianelli/',
  /**
   * The address never appears in clear text in the repo or in the HTML:
   * it is base64 of the reversed string, decoded client-side on demand.
   */
  emailEncoded: 'bW9jLmxpYW1nQGlsbGVuYWl0c2FiLm9jcmFtbmFpZw==',
} as const;
