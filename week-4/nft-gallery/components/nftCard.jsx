import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faCheck } from '@fortawesome/free-solid-svg-icons'

export const NFTCard = ({ nft }) => {

  const [copyIcon, setCopyIcon] = useState(<FontAwesomeIcon icon={faPaperclip} />)
  
  const copyToClibBoard = (contractAddress) => {

    navigator.clipboard.writeText(contractAddress)
    .then(() => {
      setCopyIcon(<FontAwesomeIcon icon={faCheck} />);
      setTimeout(()=> {
        setCopyIcon(<FontAwesomeIcon icon={faPaperclip} />);
      }, 3000);
    }, 
    () => console.log("error copying text"));

  }

  return (
      <div className="w-1/4 flex flex-col ">
      <div className="rounded-md">
          <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} ></img>
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
          <div className="">
              <h2 className="text-xl text-gray-800">{nft.title}</h2>
              <p className="text-gray-600">Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
              <p className="text-gray-600" >
                {`${nft.contract.address.substr(0, 5)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`}
                &nbsp; <span 
                onClick={() => copyToClibBoard(nft.contract.address)} 
                >
                  {copyIcon}
                </span>
              </p>
          </div>

          <div className="flex-grow mt-2">
              <p className="text-gray-600">{nft.description?.substr(0, 150)}</p>
          </div>

          <div>
            <a target='_blank' href={`https://etherscan.io/token/${nft.contract.address}`}>View on etherscan</a>
          </div>
      </div>

  </div>
  )
}