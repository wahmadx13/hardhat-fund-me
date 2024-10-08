import { network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains } from "../helper-hardhat-config"

const DECIMALS = "18"
const INITIAL_PRICE = "2000000000000000000000" // 2000

const deployMocks: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  if (chainId == 31337) {
    log("Local network detected! Deploying mocks...")
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    })
    log("Mocks Deployed!")
    log("----------------------------------")
    log(
      "You are deploying to a local network, you'll need a local network running to interact"
    )
    log(
      "Please run `yarn hardhat console` to interact with the deployed smart contracts!"
    )
    log("----------------------------------")
  }
}

export default deployMocks
deployMocks.tags = ["all", "mocks"]
