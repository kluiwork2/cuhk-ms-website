import { IoFemale, IoMale } from "react-icons/io5";
import Link from "next/link";
import MaxWidthWrapper from "@/components/maxwidthwrapper";

import Image from "next/image";
import { dietsvg, endocrinesvg, fatsvg, sportssvg } from "@/constants";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { GiFat } from "react-icons/gi";
import { LuCandy } from "react-icons/lu";
import { PiHeartbeatFill } from "react-icons/pi";
import { LandingTable } from "@/components/landingtable";

export default function Home() {
  return (
    <>
      <section>
        <MaxWidthWrapper>
          <div className="flex flex-col mx-auto lg:flex-row ">
            <div className="flex flex-col w-full py-6 lg:w-2/3 md:py-8 lg:py-12">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="text-primary">代謝症候群</span>{" "}
                不是一種特定疾病，而是一個健康的危險訊號，表示病人同時積累了多個高危不健康因素。
              </h1>
              <p className="mt-6 text-lg max-w-prose text-muted-foreground sm:text-xl">
                包括：腰部脂肪過多（中央肥胖）、高密度脂蛋白膽固醇（好膽固醇）偏低、三酸甘油酯偏高、高血壓及高血糖。雖然此症患者沒有即時生命危險，初期亦沒有明顯病徵，但其實健康已開始受威脅，他們出現併發症（例如心臟病、腎衰竭、中風等）的機會較只有單一高危不健康因素人士高3倍。
                <br />
                <br />
                根據國際糖尿聯盟（International Diabetes
                Federation，IDF）的指引，如果病人有中央肥胖，再加上有兩個或以上高危因素，則被確認患上代謝症候群。
              </p>
              <h3 className="flex text-lg font-bold justify-center pt-5 text-red-800 sm:text-xl">
                以亞洲地區的標準，中央肥胖的定義是
              </h3>
              <div className="flex flex-col justify-center sm:flex-row mt-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-sky-500 text-gray-50">
                    <IoMale className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="flex pl-5 items-center text-xl font-medium leading-6">
                  男性腰圍≧90厘米（35.4吋）
                </h3>
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-pink-500 text-gray-50">
                  <IoFemale className="w-8 h-8" />
                </div>
                <h3 className="flex pl-5 items-center text-xl font-medium leading-6">
                  女性腰圍≧80厘米（31.5吋）
                </h3>
              </div>
            </div>
            <div className="w-full py-6 lg:w-1/3 md:py-8 lg:py-12">
              <img src="/oldman.png" alt="" />
            </div>
          </div>
          <div className="flex flex-col items-center pt-5">
            <LandingTable />
            <Link href={"#section02"}>
              <h2 className="pt-8 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                了解更多
              </h2>
            </Link>
            <Link href={"#section02"}>
              <FaArrowAltCircleDown
                className="animate-bounce w-7 h-7 text-primary"
                href="#section02"
              />
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
      <section id="section02">
        <div className="min-h-screen flex items-center justify-center pb-10">
          <div className="relative w-full max-w-7xl">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="relative space-y-4">
              <div className="p-20 m-5 bg-white rounded-lg flex flex-col items-center justify-center">
                <h2>代謝症候群的成因</h2>
                <h4>導致因素包括：</h4>
                <div className="container mx-auto grid justify-center gap-4 lg:grid-cols-2">
                  <div className="flex flex-col justify-center items-center p-4">
                    <svg
                      viewBox="0 0 160 160"
                      fill="currentColor"
                      className="w-32 h-32 text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d={endocrinesvg}
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <h3 className="my-3 text-2xl font-semibold">內分泌失調</h3>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <svg
                      viewBox="0 0 160 160"
                      fill="currentColor"
                      className="w-32 h-32 text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d={dietsvg}
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <h3 className="my-3 text-2xl font-semibold">
                      不適當的飲食習慣
                    </h3>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <svg
                      viewBox="0 0 160 160"
                      fill="currentColor"
                      className="w-32 h-32 text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d={fatsvg}
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <h3 className="my-3 text-2xl font-semibold">肥胖</h3>
                  </div>
                  <div className="flex flex-col items-center p-4">
                    <svg
                      viewBox="0 0 160 160"
                      fill="currentColor"
                      className="w-32 h-32 text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d={sportssvg}
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <h3 className="my-3 text-2xl font-semibold">缺乏運動</h3>
                  </div>
                </div>
                <p>
                  內分泌失調、肥胖、不適當的飲食習慣和缺乏運動等多方面因素皆會導致代謝症候群。缺乏體育活動和不良飲食都與肥胖、高血壓、三酸甘油酯和高膽固醇有關。另外，其他疾病也可能增加代謝症候群的風險。例如，睡眠窒息症和抑鬱症等疾病都與代謝症候群有關。
                  <br />
                  <br />
                  香港中文大學內科及藥物治療學系進行的研究顯示，代謝症候群的風險會隨著年齡增加。
                </p>
                <Image src="/reason2.png" alt="" width={895} height={628} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <MaxWidthWrapper>
          <div className="flex flex-col justify-between items-center">
            <h2>代謝症候群併發症</h2>
            <div className="mx-auto p-6">
              <div className="md:flex justify-center space-x-10">
                <div className="bg-gradient-to-tr from-slate-700 to-stone-700 relative w-80 h-80 max-w-full rounded-lg shadow-2xl overflow-hidden">
                  <img
                    className="mix-blend-overlay absolute inset-0 w-full h-full object-cover"
                    src="/hearts_640x427.jpg"
                    alt=""
                  />
                  <h3 className="absolute bottom-10 right-10 my-3 text-2xl font-semibold text-blue-50">
                    心血管疾病
                  </h3>
                </div>
                <div className="bg-gradient-to-tr from-slate-700 to-stone-700 relative w-80 h-80 max-w-full rounded-lg shadow-2xl overflow-hidden">
                  <img
                    className="mix-blend-overlay absolute inset-0 w-full h-full object-cover"
                    src="/stroke.jpg"
                    alt=""
                  />
                  <h3 className="absolute bottom-10 right-10 my-3 text-2xl font-semibold text-blue-50">
                    中風
                  </h3>
                </div>
                <div className="bg-gradient-to-tr from-slate-700 to-stone-700 relative w-80 h-80 max-w-full rounded-lg shadow-2xl overflow-hidden">
                  <img
                    className="mix-blend-overlay absolute inset-0 w-full h-full object-cover"
                    src="/diabetes_640x1138.jpg"
                    alt=""
                  />
                  <h3 className="absolute bottom-10 right-10 my-3 text-2xl font-semibold text-blue-50">
                    糖尿病
                  </h3>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center px-4 lg:px-24 m-5">
              <p>
                代謝症候群可以增加心血管疾病、中風和糖尿病等疾病的風險，甚至死亡。高三酸甘油酯、高膽固醇和高血壓可以損害血管壁，增加動脈粥樣硬化的風險。高空腹血糖可以導致糖尿病的發生。
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section>
        <div className="flex flex-col justify-center items-center">
          <h2>治療及預防代謝症候群</h2>
        </div>
        <div className="flex flex-col mx-auto lg:flex-row w-full max-w-screen-2xl">
          <div className="flex flex-col w-full py-6">
            <div className="bg-gradient-to-tr from-slate-500 to-stone-500 relative w-full h-full max-w-full overflow-hidden">
              <img
                className="mix-blend-overlay absolute inset-0 w-full h-full object-cover"
                src="/bg-exercise.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center px-5 m-5">
            <p>
              治療代謝症候群的首要原因是降低患者患上心臟病、糖尿病和中風的風險。方法包括通過生活方式的改變，如保持健康的飲食和定期運動，藥物和醫學管理。
              <br />
              <br />
              健康的飲食習慣在管理代謝症候群中十分重要。進食含纖維的水果和蔬菜、低脂肪和碳水化合物的飲食可以幫助提高胰島素敏感度、降低血壓並降低心臟病、糖尿病和中風的風險。特別是，高蛋白質和低碳水化合物的飲食已被證明能有效減少代謝症候群的症狀。
              <br />
              <br />
              有代謝症候群的人可能需要藥物和醫學管理以降低患心臟病、糖尿病和中風的風險。這可能包括控制血壓、膽固醇和血糖水平的藥物，以及改善胰島素敏感性的藥物。
              <br />
              <br />
              除了用藥物管理方法外，不同治療措施已被提出用來管理代謝症候群，其中良好的生活習慣，如適當運動和減少肥胖，是公認能防治代謝症候群的首要方法。經常進行中等強度的運動，可以預防或延緩二型糖尿病的發生，降低血脂及減少患上心臟病和中風的風險。
            </p>
          </div>
        </div>
      </section>
      <section>
        <MaxWidthWrapper>
          <div className="flex flex-col lg:flex-row justify-between items-center px-5 m-5">
            <div className="max-w-sm p-6 m-5 bg-white border border-gray-200 rounded-lg shadow">
              <PiHeartbeatFill className="w-8 h-8 text-primary" />
              <a href="/general/highblood">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                  高血壓
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-500">
                代謝症候群其中一個重要的可改變風險因素。
              </p>
              <a
                href="/general/highblood"
                className="inline-flex font-medium items-center text-primary hover:underline"
              >
                了解更多
              </a>
            </div>
            <div className="max-w-sm p-6 m-5 bg-white border border-gray-200 rounded-lg shadow">
              <LuCandy className="w-8 h-8 text-primary" />
              <a href="/general/diabetes">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                  糖尿病
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-500">
                血糖長期過高會導致血管病變，令多個器官出現問題。
              </p>
              <a
                href="/general/diabetes"
                className="inline-flex font-medium items-center text-primary hover:underline"
              >
                了解更多
              </a>
            </div>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
              <GiFat className="w-8 h-8 text-primary" />
              <a href="/general/obese">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                  超重或肥胖
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-500">
                肥胖定義為損害健康的多餘脂肪，通常以BMI ≥ 30kg/m2來定義的。
              </p>
              <a
                href="/general/obese"
                className="inline-flex font-medium items-center text-primary hover:underline"
              >
                了解更多
              </a>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
