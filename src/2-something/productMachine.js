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
      entry: assign({tagId: null}),
      on: {
        MANUAL_ASSOCIATION: {
          target: "tryAssociation",
          actions: assign({ tagId: (ctx, evt) => evt.tagId })
        }
      }
    },
    tryAssociation: {
      invoke: {
        src: "tryMakeAssociation",
        onDone: {
          target: "associated"
        },
        onError: {
          target: "unassociated"
        }
      }
    },
    associated: {
      on: {
        MANUAL_DISASSOCIATION: {
          target: "unassociated",
          actions: ["tryDisassociate"]
        }
      }
    },
    deleted: {
      entry: ["cleanupInstance", "tryDisassociate"],
      type: "final"
    }
  }
});

export { productMachine };
