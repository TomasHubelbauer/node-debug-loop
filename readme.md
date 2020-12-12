# Node Debug Loop

Go to `node-cdp-ws` and patch the `upgrade` method on line 70 to add globals:

```patch
+global.response = response;
+global.stream = stream;
```

Open the VS Code integrated terminal and split it into three side-by-side ones.
In the initial one, run `node .` and in the remaining ones run `node test`.
Keep entering PIDs of the test processes in an alternating fashion.

Notice that after the first debugger attachment (which may already exist prior
to this experiment), it stays attached to the same process.

## To-Do

### Find out how to end the current debugging session and attach a new session
