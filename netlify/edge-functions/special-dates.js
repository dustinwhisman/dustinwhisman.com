import {
  EleventyEdge,
  precompiledAppData,
} from './_generated/eleventy-edge-app.js';

// is today April 9th?
const isCssNakedDay = () => {
  const today = new Date();
  if (today.getMonth() !== 3) {
    return false;
  }

  if (today.getDate() !== 9) {
    return false;
  }

  return true;
};

// handle the gap between January 1st and the first build of the year
const currentYear = () => {
  const today = new Date();
  const year = today.getFullYear();
  return year;
};

export default async (request, context) => {
  try {
    let edge = new EleventyEdge('edge', {
      request,
      context,
      precompiled: precompiledAppData,
    });

    edge.config((eleventyConfig) => {
      eleventyConfig.addGlobalData('isCssNakedDay', isCssNakedDay());
      eleventyConfig.addGlobalData('currentYear', currentYear());
    });

    return await edge.handleResponse();
  } catch (e) {
    console.log('ERROR', { e });
    return context.next(e);
  }
};
