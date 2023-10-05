"use client";
import FaqsList from "@/components/FaqsList";
import swiggyServices from "@/shared/service/swiggy.service";
import React, { useState, useEffect } from "react";

function Support() {
  const [supportIssues, setSupportIssues] = useState<Array<any>>([]);
  const [issueTypeSelected, setIssueTypeSelected] = useState<string>("");
  const [faqs, setFaqs] = useState<Array<any>>([]);

  const getSupportIssues = () => {
    swiggyServices.getSupportIssues().then((res) => {
      setSupportIssues(res.data.data.issueTypes.data);
      setIssueTypeSelected(res.data.data.issueTypes.data[0].type);
    });
  };

  const getIssuesRelatedFaqs = (issueType: string) => {
    setFaqs([]);
    swiggyServices.getIssueRelatedFaqs(issueType).then((res) => {
      console.log(res.data);
      setFaqs(res.data.data.issues.data);
    });
  };

  useEffect(() => {
    getSupportIssues();
  }, []);

  useEffect(() => {
    if (issueTypeSelected !== "") {
      getIssuesRelatedFaqs(issueTypeSelected);
    }
  }, [issueTypeSelected]);
  return (
    <div className="mt-20 flex flex-col flex-grow bg-[#37718e] px-6 pt-10">
      <div className="w-full max-w-[76rem] mx-auto flex-grow flex flex-col mb-16 lg:mb-0">
        <div className="text-white my-9">
          <h2 className="font-extrabold text-4xl">Help & Support</h2>
          <h4 className="font-light text-base mt-1">{`Let's take a step ahead and help you better.`}</h4>
        </div>
        <div className="w-full bg-gray-50 flex-grow flex flex-col md:flex-row md:space-x-8 px-8 py-10">
          <div className="bg-gray-200 w-full md:w-64 md:min-w-[256px] px-5 md:px-0 md:pl-6 py-6">
            <ul className="flex flex-col">
              {supportIssues.map((issue) => {
                return (
                  <li key={Math.random()}>
                    <button
                      onClick={() => setIssueTypeSelected(issue.type)}
                      className={`px-6 md:px-0 md:pl-16 md:pr-6 py-6 ${
                        issueTypeSelected === issue.type
                          ? "bg-white font-semibold"
                          : "bg-transparent font-normal hover:font-semibold"
                      } text-base w-full text-left`}
                    >
                      {issue.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-5">
            <h2 className="font-bold text-2xl text-gray-800 capitalize mb-2">
              {issueTypeSelected.split("-").join(" ")}
            </h2>
            {faqs.length > 0 &&
              faqs.map((faq, index: number) => {
                return (
                  <>
                    <FaqsList key={Math.random()} faq={faq} />
                    {index < faqs.length - 1 && (
                      <hr className="my-2 border-gray-300" />
                    )}
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
