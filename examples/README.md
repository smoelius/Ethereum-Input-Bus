# EIB examples

The `examples` directory contains two sample webapps written to use EIB.

* Proxy Web UI simply sends requests to EIB and receives responses from EIB using a web interface.

* Spellcheck is a contract that checks for the presence/absence of a word in a dictionary.  EIB is used
  to read from the dictionary.

To run the Spellcheck example, perform the steps below with X = the path the Spellcheck directory.

To run the Proxy Web UI example, perform the steps below with X = the path to the Proxy Web UI
directory, but skip step 5.

0. Ensure that [Ganache](https://truffleframework.com/ganache), [Metamask](https://metamask.io/), and
   all of the prerequisites listed in [README.md](../README.md#user-content-prerequisites) are
   installed.

1. Launch Ganache.

2. Open a terminal window in which to perform steps 3-7 below.

3. Send your Metamask account some ether: cd to the `eib` directory, type `truffle console`, enter the
   following command, and then type `ctrl-D` to exit:

  * `web3.eth.sendTransaction({to: "`*your_Metamask_account*`", from: "`*first_account_in_Ganache*`", value: web3.toWei(10, "ether") })`

4. cd to the `eib` directory and type `make clean deploy`.

5. **Spellcheck only:** cd to X and type `make clean deploy`.

6. cd to the top of the EIB repository and type `make`.

7. cd to X and type `./launch.sh`.

8. In another terminal window, cd to the `eibs_ts` directory and type `make run`.

9. In a web browser, go to "<http://127.0.0.1:8000>".