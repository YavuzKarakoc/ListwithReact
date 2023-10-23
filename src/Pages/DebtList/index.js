import React, { useState } from "react";
import { debtListData } from "../../services/Data/data1";
import "../DebtList/style.css"

const DebtList = () => {
  const [openSections, setOpenSections] = useState({});
  const debtlistshow = JSON.parse(debtListData.response.scriptResult);

  const data = JSON.parse(JSON.stringify(debtlistshow));
  function calculateFirstBreakdown(data) {
    const FirstBreakdown = {};

    data.forEach((item) => {
      const topLevel = item.hesap_kodu.split(".")[0];
      const control = item.hesap_kodu.split(".");
      if (!FirstBreakdown[topLevel]) {
        FirstBreakdown[topLevel] = {
          hesap_kodu: topLevel,
          borc: 0,
          alacak: 0,
        };
      }
      if (!control[2]) {
        FirstBreakdown[topLevel].borc += parseFloat(item.borc) || 0;
        FirstBreakdown[topLevel].alacak += parseFloat(item.alacak) || 0;
      }
    });

    return Object.values(FirstBreakdown);
  }

  const FirstBreakdown = calculateFirstBreakdown(data);

  const secondData = JSON.parse(JSON.stringify(debtlistshow));
  const secondBreakdownData = secondData.filter((item) => {
    const listsplit = item.hesap_kodu.split(".");
    if (listsplit[1].length === 2 && !listsplit[2]) {
      return item;
    }
  });

  const secondBreakdown = [...FirstBreakdown, ...secondBreakdownData];

  secondBreakdown.sort((a, b) => {
    const hesapKoduA = a.hesap_kodu;
    const hesapKoduB = b.hesap_kodu;

    if (hesapKoduA < hesapKoduB) {
      return -1;
    }
    if (hesapKoduA > hesapKoduB) {
      return 1;
    }
    return 0;
  });

  console.log(secondBreakdown);

  const thirdBreakdown = [...FirstBreakdown, ...debtlistshow];

  thirdBreakdown.sort((a, b) => {
    const hesapKoduA = a.hesap_kodu;
    const hesapKoduB = b.hesap_kodu;

    if (hesapKoduA < hesapKoduB) {
      return -1;
    }
    if (hesapKoduA > hesapKoduB) {
      return 1;
    }
    return 0;
  });

  const ustKirimlar = [];
  const firstBreakdown = [];
  const secondBreakdown2 = [];

  thirdBreakdown.forEach((item) => {
    const parts = item.hesap_kodu.split(".");

    if (item.ust_hesap_id === undefined) {
      ustKirimlar.push(item);
    } else if (parts.length === 2) {
      firstBreakdown.push(item);
    } else if (parts.length === 3) {
      secondBreakdown2.push(item);
    }
  });
  // Alt kırılımları ilgili üst kırılımlara eklemek
  ustKirimlar.forEach((mainAccount) => {
    mainAccount.first_breakdown = firstBreakdown.filter((a) =>
      a.hesap_kodu.startsWith(mainAccount.hesap_kodu + ".")
    );
    firstBreakdown.forEach((f) => {
      f.second_breakdown = secondBreakdown2.filter((a) =>
        a.hesap_kodu.startsWith(f.hesap_kodu + ".")
      );
      console.log(firstBreakdown);
    });
  });

  const toggleSection = (sectionKey) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [sectionKey]: !prevOpenSections[sectionKey],
    }));
  };

  return (
    <>
      <h1 className="mb-5">Listeler Sayfamız</h1>

      <div className="d-flex justify-content-center">
        <div className="col-4 ">
          <ul className="list_body w-100" id="debtlist">
            {ustKirimlar.map((mainAccount, index) => (
              <li key={index} style={{ listStyleType: "none" }} className="col-12 row w-100">
                
                <div className="col-2">
                <button
                  className={` ${
                    openSections[mainAccount.hesap_kodu] ? "active" : ""
                  }`}
                  onClick={() => toggleSection(mainAccount.hesap_kodu)}
                  id="acrbutton"
                >
                  {openSections[mainAccount.hesap_kodu] ? "-" : "+"}
                </button>
                </div>
                <div className="col-5 d-flex justify-content-center">
                {mainAccount.hesap_kodu} 
                </div>
                <div className="col-5 d-flex justify-content-center">
                {mainAccount.borc} 
                </div>
               
                <ul
                  style={{
                    display: openSections[mainAccount.hesap_kodu]
                      ? "block"
                      : "none",
                  }}
                  className="w-100"
                >
                  {mainAccount.first_breakdown.map((fb, altIndex) => (
                    <li key={altIndex} style={{ listStyleType: "none" }} className="col-12 row w-100">
                      <div className="col-2">
                      <button
                        className={`accordion ${
                          openSections[fb.hesap_kodu] ? "active" : ""
                        }`+ "acrbutton"}
                        onClick={() => toggleSection(fb.hesap_kodu)}
                        id="acrbutton2"
                      >
                        {openSections[fb.hesap_kodu] ? "-" : "+"}
                      </button>
                      </div>
                      <div className="col-5 col-5 d-flex justify-content-center">
                       {fb.hesap_kodu}
                      </div>
                      <div className="col-5 col-5 d-flex justify-content-center">
                      {fb.borc}
                      </div>
                      
                      
                      <ul
                        style={{
                          display: openSections[fb.hesap_kodu]
                            ? "block"
                            : "none",
                        }}
                        className="w-100"
                      >
                        {fb.second_breakdown.map((sb, altIndex) => (
                          <li key={altIndex} style={{ listStyleType: "none" }} className="col-12 row w-100">
                            <div className="col-2"></div>
                            <div className="col-5 d-flex justify-content-center">
                            {sb.hesap_kodu}
                            </div>
                            <div className="col-5 d-flex justify-content-center">
                            {sb.borc}
                            </div>
                             
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DebtList;
