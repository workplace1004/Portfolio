# Folder Structure

This project follows a standard Next.js `src` directory structure.

-   **/src/app/**: The core of the application, containing pages, layouts, and global styles. In Next.js App Router, each folder inside `app` represents a route.
    -   `layout.tsx`: The main layout for the entire application.
    -   `page.tsx`: The main page of the portfolio.
    -   `globals.css`: Global styles for the application.

-   **/src/components/**: Contains all the React components used in the application, organized by type.
    -   **/src/components/canvas/**: Components related to the 3D scene, using `@react-three/fiber` and `@react-three/drei`.
    -   **/src/components/ui/**: Standard 2D user interface components.

-   **/src/lib/**: Contains helper functions, custom hooks, and other library-like code.
    -   **/src/lib/animations/**: Code related to `gsap` animations.
    -   **/src/lib/content/**: Likely contains the content for the portfolio sections.
    -   **/src/lib/hooks/**: Custom React hooks.

-   **/src/store/**: Contains the [Zustand](https://github.com/pmndrs/zustand) store for global state management.
    -   `spaceStore.ts`: The store for managing the state of the space background.

-   **/public/**: For static assets that don't need to be processed by the build system, like images, SVGs, and fonts.

-   **/project-info/**: Contains documentation to help understand the project.
    -   `project-overview.md`: High-level summary of the project.
    -   `tech-stack.md`: List of technologies and libraries used.
    -   `folder-structure.md`: This file, explaining the project's structure.
    -   `run-commands.md`: Common commands for development.
