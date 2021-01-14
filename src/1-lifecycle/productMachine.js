import { Machine, assign } from "xstate";

const productMachine = Machine({
  id: "product",
  initial: "unassociated",
  on: {
    DELETE: {
      target: "deleted"
    }
  },
  states: {
    unassociated: {
      on: {
        MANUAL_ASSOCIATION: {
          target: "associated",
          actions: assign({ tagId: (ctx, evt) => evt.tagId })
        }
      }
    },
    associated: {
      on: {
        MANUAL_DISASSOCIATION: {
          target: "unassociated",
          actions: assign({ tagId: null })
        }
      }
    },
    deleted: {
      entry: ["cleanupInstance"],
      type: "final"
    }
  }
});

export { productMachine };
