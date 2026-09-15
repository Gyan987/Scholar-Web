
import { CompiledContract } from "@midnight-ntwrk/midnight-js-protocol/compact-js";

import * as ContractModule from "./managed/credifi/contract/index.js";
import * as WitnessModule from "./witnesses";

export type CrediFiContractInstance =
  ContractModule.Contract<WitnessModule.CrediFiPrivateState>;

export const CrediFiCompiledContract = CompiledContract.make<
  CrediFiContractInstance
>(
  "CrediFi",
  ContractModule.Contract<WitnessModule.CrediFiPrivateState>,
).pipe(
  CompiledContract.withWitnesses(WitnessModule.witnesses),
  CompiledContract.withCompiledFileAssets("./managed/credifi"),
);

export * from "./managed/credifi/contract/index.js";
export * from "./witnesses";

