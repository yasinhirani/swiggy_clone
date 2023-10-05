import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

function FaqsList({ faq }: any) {
  const [isFaqOpen, setIsFaqOpen] = useState<boolean>(false);
  return (
    <div className="py-4">
      <div
        role="button"
        onClick={() => setIsFaqOpen(!isFaqOpen)}
        className="flex justify-between items-start space-x-4 group"
      >
        <p className="font-light text-lg text-gray-800 group-hover:text-orange-500">{`${faq.title}`}</p>
        <ChevronDownIcon
          className={`w-5 h-5 min-w-[20px] ${
            isFaqOpen ? "rotate-180" : "rotate-0"
          } transition-transform text-gray-500`}
        />
      </div>
      <div className={`${isFaqOpen ? "h-auto mt-5" : "h-0"} overflow-hidden`}>
        {faq.options.length === 0 ? (
          <p className="font-light text-base text-gray-500 flex flex-col space-y-1">
            {faq.description.split("\n").map((desc: string) => {
              return(
                <span key={Math.random()}>{desc}</span>
              )
            })}
          </p>
        ) : (
          <div className="flex flex-col space-y-6 items-start">
            {faq.hyperLink && faq.hyperLinkText && (
              <a
                href={faq.hyperLink}
                target="_blank"
                className="text-orange-500 font-bold text-sm"
              >
                {faq.hyperLinkText}
              </a>
            )}
            <div className="flex flex-col space-y-2">
              <a
                href={`mailto:${faq.options[0].emailId}`}
                target="_blank"
                className="text-orange-500 font-bold border border-orange-500 px-4 py-2"
              >
                SEND AN EMAIL
              </a>
              <span className="font-normal text-xs text-gray-400">{`*${faq.options[0].waitTime}`}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FaqsList;
