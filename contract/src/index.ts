
// CrediFi contract compilation entrypoint.
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is provided on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { CompiledContract } from "@midnight-ntwrk/midnight-js-protocol/compact-js";

export * from "./managed/credifi/contract/index.js";
export * from "./witnesses";

import * as CrediFiContract from "./managed/credifi/contract/index.js";
import * as CrediFiWitnesses from "./witnesses";

export const CompiledCrediFiContract = CompiledContract.make<
  CrediFiContract.Contract<CrediFiWitnesses.CrediFiPrivateState>
>("CrediFi", CrediFiContract.Contract<CrediFiWitnesses.CrediFiPrivateState>).pipe(
  CompiledContract.withWitnesses(CrediFiWitnesses.witnesses),
  CompiledContract.withCompiledFileAssets("./managed/credifi"),
);

