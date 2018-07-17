## Observations/bugs

- it turns out that with CSS Grid, you can't really style rows/columns, so you can apply styles on hover to them, as rows aren't actually HTML elements. Bummer.
  - This is the reason why I switched to Flexbox, which led to weird spacing issues (eg. votes not lining up with each other), as each row is now independent of the other rows. I'd love to explore a better solution with you :)
