
import { Ledger } from "./managed/credifi/contract/index.js";
import { WitnessContext } from "@midnight-ntwrk/midnight-js-protocol/compact-runtime";

export type CrediFiPrivateState = {
  readonly secretKey: Uint8Array;
  readonly financialCredentialSecret: Uint8Array;
  readonly borrowerRecordKey: Uint8Array;
};

export function createCrediFiPrivateState(
  secretKey: Uint8Array,
  financialCredentialSecret?: Uint8Array,
  borrowerRecordKey?: Uint8Array,
): CrediFiPrivateState {
  return {
    secretKey,
    financialCredentialSecret: financialCredentialSecret ?? secretKey,
    borrowerRecordKey: borrowerRecordKey ?? secretKey,
  };
}

export const witnesses = {
  localSecretKey: (
    context: WitnessContext<Ledger, CrediFiPrivateState>,
  ): [CrediFiPrivateState, Uint8Array] => [
    context.privateState,
    context.privateState.secretKey,
  ],

  financialCredentialSecret: (
    context: WitnessContext<Ledger, CrediFiPrivateState>,
  ): [CrediFiPrivateState, Uint8Array] => [
    context.privateState,
    context.privateState.financialCredentialSecret,
  ],

  borrowerRecordKey: (
    context: WitnessContext<Ledger, CrediFiPrivateState>,
  ): [CrediFiPrivateState, Uint8Array] => [
    context.privateState,
    context.privateState.borrowerRecordKey,
  ],
};
```
