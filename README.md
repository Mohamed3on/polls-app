# How to run the app

- Easy way: go to the [deployed version](https://mohamed-polls-app.now.sh).

- Hard way:

  ```
  yarn install
  yarn start
  ```

  # How to run the tests

  There are no tests. 🤷‍♀️

## Observations/bugs

- Question Details page:

  - it turns out that with CSS Grid, you can't really style rows/columns, so you can apply styles on hover to them, as rows aren't actually HTML elements. Bummer.

    - This is the reason why I switched to Flexbox, which led to weird spacing issues (eg. votes not lining up with each other), as each row is now independent of the other rows. Maybe you have a better approach to solve this?

  - For some reason, sending a vote to any question always sends that vote to the first question only. Example: send a vote for question with id 5 with choice id of 3:
    `https://polls.apiblueprint.org/questions/5/choices/3` The result is:

    ```
    {
    "url": "/questions/1/choices/3",
    "votes": 12,
    "choice": "Objective-C"
    }
    ```

    Not what you'd imagine..
