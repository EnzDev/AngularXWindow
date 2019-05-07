Angular XWindow
==============

This is a funny project where I try to mimic the bahaviors of an X Server with Angular.  
I'm on the experimentation phase and most of the code should not be usable as-is.

The `WindowManagerComponent` handle the instantiation/destruction of the Components and their positions in the Window.

Each `WindowComponent` define its own size and allow the `WindowManagerComponent` to try to resize it based on their own limitation and resize implementation.
