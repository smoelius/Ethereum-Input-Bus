#======================================================================================================#
# Makefile for EIB contracts
#======================================================================================================#

include ../common/variables.mk

JSON := build/contracts/Input_bus.json \
        build/contracts/Migrations.json \
        build/contracts/Proxy_requestor.json

.PHONY: all pre_tsc post_tsc compile types \
  check \
    check_supply_overhead \
      check_supply_pre_callback_overhead \
      check_supply_post_callback_overhead \
      check_supply_pre_return_overhead \
    check_callback_nonemitting_gas_costs \
      check_callback_nonemitting_selection_gas_cost \
      check_callback_nonemitting_intro_gas_cost \
      check_callback_nonemitting_main_gas_cost \
    check_callback_emitting_gas_costs \
      check_callback_emitting_selection_gas_cost \
      check_callback_emitting_intro_gas_cost \
      check_callback_emitting_main_gas_cost \
      check_callback_emitting_pre_getter_overhead \
      check_callback_emitting_post_getter_overhead \
      check_get_supplier_selection_gas_cost \
      check_get_data_selection_gas_cost \
      check_get_proof_selection_gas_cost \
  xyz.tsv test deploy clobber clean

#======================================================================================================#

all: pre_tsc post_tsc

pre_tsc: types/web3-contracts/index.d.ts

post_tsc:

compile: $(JSON)

types: types/web3-contracts/index.d.ts

types/web3-contracts/index.d.ts: $(JSON)
	$(NPX) typechain --target web3-1.0.0 'build/contracts/*.json'
	( \
    echo 'export * from "./Input_bus"' ; \
    echo 'export * from "./Proxy_requestor"' \
  ) > $@

build/contracts/%.json: contracts/%.sol
	$(NPX) truffle compile

#======================================================================================================#

check: check_supply_overhead \
    check_callback_nonemitting_gas_costs \
    check_callback_emitting_gas_costs

#======================================================================================================#

check_supply_overhead: check_supply_pre_callback_overhead check_supply_post_callback_overhead \
    check_supply_pre_return_overhead

check_supply_pre_callback_overhead: Input_bus_opcodes.txt
	$(GREP) -- "\<PRE_CALLBACK_OVERHEAD = $$(../scripts/sum_opcode_gas_costs.sh \
	    '\<INVALID\>\|\<JUMP\>' \
	    '.*\<GAS\>\(.*[^ ]\+.*\<CALL\>\)' < $< \
	  )\>" \
	  contracts/Input_bus.sol

check_supply_post_callback_overhead: Input_bus_opcodes.txt
	$(GREP) -- "\<POST_CALLBACK_OVERHEAD = $$(../scripts/sum_opcode_gas_costs.sh \
	    '\<INVALID\>\|\<JUMP\>' \
	    '.*\<CALL\>\(.*\<GAS\>\)' < $< \
	  )\>" \
	  contracts/Input_bus.sol

check_supply_pre_return_overhead: Input_bus_opcodes.txt
	$(GREP) -- "\<PRE_RETURN_OVERHEAD = $$(../scripts/sum_opcode_gas_costs.sh \
	    '\<INVALID\>\|\<JUMP\>' \
	    '.*\<GAS\>\(.*\<REVERT\>\)' < $< \
	  )\>" \
	  contracts/Input_bus.sol

#======================================================================================================#

check_callback_nonemitting_gas_costs: \
    check_callback_nonemitting_selection_gas_cost \
    check_callback_nonemitting_intro_gas_cost \
    check_callback_nonemitting_main_gas_cost

check_callback_nonemitting_selection_gas_cost: Proxy_requestor_opcodes.txt
	$(GREP) -- "\<CALLBACK_NONEMITTING_SELECTION_GAS_COST = $$(../scripts/selection_gas_cost.sh \
	    'callback_nonemitting(uint256)' < $< \
	  )\>" \
	  contracts/Proxy_requestor.sol

check_callback_nonemitting_intro_gas_cost: Proxy_requestor_opcodes.txt
	$(GREP) -- "\<CALLBACK_NONEMITTING_INTRO_GAS_COST = $$(../scripts/sum_opcode_gas_costs.sh \
	    '\<INVALID\>\|\<JUMP\>\|\<RETURN\>\|\<STOP\>\|\<CALLVALUE\>' \
	    '\(\<JUMPDEST\>.*.*\<CALLDATASIZE\>.*\<CALLDATALOAD\>.*\)' < $< \
	  )\>" \
	  contracts/Proxy_requestor.sol

check_callback_nonemitting_main_gas_cost: Proxy_requestor_opcodes.txt
	$(GREP) -- "\<CALLBACK_NONEMITTING_MAIN_GAS_COST = $$(../scripts/sum_opcode_gas_costs.sh \
	    '\<INVALID\>\|\<JUMP\>\|\<RETURN\>\|\<STOP\>\|\<LOG1\>' \
	    '\(\<JUMPDEST\>.*\<CALLER\>.*\<REVERT\>\)' < $< \
	  )\>" \
	  contracts/Proxy_requestor.sol

#======================================================================================================#

check_callback_emitting_gas_costs: \
    check_callback_emitting_selection_gas_cost \
    check_callback_emitting_intro_gas_cost \
    check_callback_emitting_main_gas_cost \
    check_callback_emitting_pre_getter_overhead \
    check_callback_emitting_post_getter_overhead \
    check_get_supplier_selection_gas_cost \
    check_get_data_selection_gas_cost \
    check_get_proof_selection_gas_cost

check_callback_emitting_selection_gas_cost: Proxy_requestor_opcodes.txt
	$(GREP) -- "\<CALLBACK_EMITTING_SELECTION_GAS_COST = $$(../scripts/selection_gas_cost.sh \
	    'callback_emitting(uint256)' < $< \
	  )\>" \
	  contracts/Proxy_requestor.sol

check_callback_emitting_intro_gas_cost: Proxy_requestor_opcodes.txt
	$(GREP) -- "\<CALLBACK_EMITTING_INTRO_GAS_COST = $$(../scripts/sum_opcode_gas_costs.sh \
	    '\<INVALID\>\|\<JUMP\>\|\<RETURN\>\|\<STOP\>\|\<CALLVALUE\>' \
	    '\(\<JUMPDEST\>.*.*\<CALLDATASIZE\>.*\<CALLDATALOAD\>.*\)' < $< \
	  )\>" \
	  contracts/Proxy_requestor.sol

check_callback_emitting_main_gas_cost: Proxy_requestor_opcodes.txt
	$(GREP) -- "\<CALLBACK_EMITTING_MAIN_GAS_COST = $$(../scripts/sum_opcode_gas_costs.sh \
	    '\<JUMP\>\|\<RETURN\>\|\<STOP\>' \
	    '\(\<JUMPDEST\>.*\<CALLER\>.*\<LOG1\>.*\<REVERT\>\)' < $< \
	  )\>" \
	  contracts/Proxy_requestor.sol

check_callback_emitting_pre_getter_overhead: Proxy_requestor_opcodes.txt
	$(GREP) -- "\<PRE_GETTER_OVERHEAD = $$(../scripts/sum_opcode_gas_costs.sh \
	    '\<INVALID\>\|\<JUMP\>' \
	    '.*\<GAS\>\(.*[^ ]\+.*\<CALL\>\)' < $< \
	  )\>" \
	  contracts/Proxy_requestor.sol

check_callback_emitting_post_getter_overhead: Proxy_requestor_opcodes.txt
	$(GREP) -- "\<POST_GETTER_OVERHEAD = $$(../scripts/sum_opcode_gas_costs.sh \
	    '\<INVALID\>\|\<JUMP\>' \
	    '.*\<CALL\>\(.*\<GAS\>\)' < $< \
	  )\>" \
	  contracts/Proxy_requestor.sol

check_get_supplier_selection_gas_cost: Input_bus_opcodes.txt
	$(GREP) -- "\<GET_SUPPLIER_SELECTION_GAS_COST = $$(../scripts/selection_gas_cost.sh \
	    'get_supplier(uint256)' < $< \
	  )\>" \
	  contracts/Proxy_requestor.sol

check_get_data_selection_gas_cost: Input_bus_opcodes.txt
	$(GREP) -- "\<GET_DATA_SELECTION_GAS_COST = $$(../scripts/selection_gas_cost.sh \
	    'get_data(uint256)' < $< \
	  )\>" \
	  contracts/Proxy_requestor.sol

check_get_proof_selection_gas_cost: Input_bus_opcodes.txt
	$(GREP) -- "\<GET_PROOF_SELECTION_GAS_COST = $$(../scripts/selection_gas_cost.sh \
	    'get_proof(uint256)' < $< \
	  )\>" \
	  contracts/Proxy_requestor.sol

#======================================================================================================#

Input_bus_opcodes.txt: build/contracts/Input_bus.json
	$(NPX) truffle opcode Input_bus | grep '^[0-9]\+:' > $@

Proxy_requestor_opcodes.txt: build/contracts/Proxy_requestor.json
	$(NPX) truffle opcode Proxy_requestor | grep '^[0-9]\+:' > $@

#======================================================================================================#

xyz.tsv:
	$(MAKE) test 2>&1 1>/dev/tty | cut -f 1-3 > $@

test:
	( \
	  $(FILICIDE_ON_EXIT_BEGIN) ; \
	  $(NPX) ganache-cli -q & $(PUSH_CHILD) ; \
	  $(MAKE) clean deploy ; \
	  $(NPX) mocha ; \
	  $(FILICIDE_ON_EXIT_END) \
	)

deploy:
	(for X in $(JSON); do $(GREP) '"address":' "$$X" || exit 1; done) || $(NPX) truffle deploy

clobber:

clean:
	rm -f Input_bus_opcodes.txt
	rm -f Proxy_requestor_opcodes.txt
	rm -f xyz.tsv
	rm -rf build
	rm -rf types

#======================================================================================================#

