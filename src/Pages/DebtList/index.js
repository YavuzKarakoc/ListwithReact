import React, { useEffect, useState } from "react";
import { debtListData } from "../../services/Data/data1";
import "../DebtList/style.css";

const DebtList = () => {
  const [openSections, setOpenSections] = useState({});
  const [datam, setdatam] = useState([])
  // const debtlistshow = JSON.parse(debtListData.response.scriptResult);
  
  const getDebtlist =async () =>{
    const token =await  localStorage.getItem('token');
    fetch("https://listwith-node.vercel.app/api/debtlist", {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    }).then(response => response.json())
    .then((response)=> {setdatam(JSON.parse(response.response.scriptResult))})
    .catch((error)=>{console.log("deblist isteği front-end de başarısız")})
    console.log(datam)
    
  }
  useEffect(() => {
    getDebtlist(); 
  }, []);  
  const debtlistshow = [...datam];

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
      <div>
        <button className="btn btn-success mt-3" onClick={getDebtlist}>İstek atıp Verileri çekmek için tıkla</button>
        </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <ul className="list_body w-100"></ul>
            <ul className="list_body w-100" id="debtlist">
              <li className="list-group-item bg-secondary  ">
                <div className="d-flex">
                  <div className="col-2"></div>
                
                <div className="col-5 d-flex justify-content-center">
                  Hesap Kodu
                </div>
                <div className="col-5 d-flex justify-content-center">
                  Toplam Borç
                </div>
                </div>
              </li>

              {ustKirimlar.map((mainAccount, index) => (
                <li key={index} className="list-group-item w-100">
                  <div className="d-flex">
                    <div className="col-2">
                      <button
                        className={`btn ${
                          openSections[mainAccount.hesap_kodu] ? "-" : "+"
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
                  </div>
                  <ul
                    style={{
                      display: openSections[mainAccount.hesap_kodu]
                        ? "block"
                        : "none",
                    }}
                    className="w-100 list-group"
                  >
                    {mainAccount.first_breakdown.map((fb, altIndex) => (
                      <li key={altIndex} className="list-group-item w-100">
                        <div className="d-flex">
                          <div className="col-2">
                            <button
                              className={`btn ${
                                openSections[fb.hesap_kodu] ? "-" : "+"
                              }`}
                              onClick={() => toggleSection(fb.hesap_kodu)}
                              id="acrbutton2"
                            >
                              {openSections[fb.hesap_kodu] ? "-" : "+"}
                            </button>
                          </div>
                          <div className="col-5 d-flex justify-content-center">
                            {fb.hesap_kodu}
                          </div>
                          <div className="col-5 d-flex justify-content-center">
                            {fb.borc}
                          </div>
                        </div>
                        <ul
                          style={{
                            display: openSections[fb.hesap_kodu]
                              ? "block"
                              : "none",
                          }}
                          className="w-100 list-group"
                        >
                          {fb.second_breakdown.map((sb, subAltIndex) => (
                            <li
                              key={subAltIndex}
                              className="list-group-item w-100"
                            >
                              <div className="d-flex">
                                <div className="col-2"></div>
                                <div className="col-5 d-flex justify-content-center">
                                  {sb.hesap_kodu}
                                </div>
                                <div className="col-5 d-flex justify-content-center">
                                  {sb.borc}
                                </div>
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
      </div>
    </>
  );
};

export default DebtList;
