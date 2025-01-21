Integrating TypeScript into the mix complicates the process.

The first difference is code is now written in .ts files. These files are monitored by TypeScript's ts server, which powers IDE features like immediate feedback on potential errors, autocomplete suggestions, and symbol renaming assistance among others.

Unlike JavaScript files, .ts files can't be executed directly by the browser or Node.js. Instead, they necessitate an initial build process.

This is where the TypeScript CLI comes into play, to transform your TypeScript files into JavaScript files. From there, the same process as JavaScript files applies, except you are not directly writing the JavaScript code yourself.

image

While TypeScript's build process is more complex than JavaScript's, the benefits of the feedback loop within your IDE make the development process much more enjoyable.
