import { useWeb3Modal } from '@web3modal/wagmi/react'
// ref: https://docs.walletconnect.com/web3modal/nextjs/about?platform=wagmi
export default function ConnectButton() {
  // Use modal hook
  const { open } = useWeb3Modal()

  return (
    <>
      <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
    </>
  )
}