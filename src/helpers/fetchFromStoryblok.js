// plugin for caching network request (makes reloads during development more performant and reduces api requests)
const Cache = require('@11ty/eleventy-cache-assets');
const fetch = require('node-fetch');

// function to fetch `stories` in a specific language from storyblok api
// prefix is used to specify the language and the document, that should be
// queried for
/**
 * Specify which documents should be requested,
 * For documents in other language, prefix the language Code (see Settings > Languages)
 * @param {string} query Language Code + type of content, eg. `en/pages` or `nav`
 * @param {boolean} getSpace if true, fetches and returns space info
 * @returns {json}
 */
module.exports = async function(query, getSpace) {
  const baseURL =
    getSpace
    ? 'https://api.storyblok.com/v2/cdn/spaces/me'
    : 'https://api.storyblok.com/v2/cdn/stories';

  // if in serverless environment, use the preview token and set version=draft to get
  // unpublished stories
  const token =
    process.env.ELEVENTY_SERVERLESS
    ? `${process.env.storyblok_preview}&version=draft`
    : process.env.storyblok_public;

  // if getSpace = true, no starts_with param required
  const url =
    getSpace
    ? `${baseURL}?token=${token}`
    : `${baseURL}?starts_with=${query}&token=${token}`;

  // if in serverless environment, use fresh data, otherwise get cached results
  if (process.env.ELEVENTY_SERVERLESS) {
    const response = await fetch(url);
    return response.json();
  } else {
    const response = await Cache(url, {
      duration: '1d',
      type: 'json'
    });
    return response;
  }
}
