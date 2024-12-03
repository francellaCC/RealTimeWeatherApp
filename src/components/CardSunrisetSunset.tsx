import 'boxicons';


function CardSunrisetSunset({sunrise, sunset} : {sunrise: string, sunset: string}) {
  return (
    <div className="container_cardSunrisetSunset">

      <div className="cardSunrisetSunset">
        <p className='cardSunrisetSunset_element_title'>Amanecer & Atardecer</p>
        <div className="cardSunrisetSunset_element_div">
          <div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#e8eaed"><path d="m734-556-56-58 86-84 56 56-86 86ZM80-160v-80h800v80H80Zm360-520v-120h80v120h-80ZM226-558l-84-86 56-56 86 86-58 56Zm71 158h366q-23-54-72-87t-111-33q-62 0-111 33t-72 87Zm-97 80q0-117 81.5-198.5T480-600q117 0 198.5 81.5T760-320H200Zm280-80Z" /></svg>
            </div>
            <div>
              <p>sunrise</p>
            <p>{sunrise}</p>
            </div>
          </div>
          <div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#e8eaed"><path d="M120-760v-80h120v80H120Zm125 213-57-56 85-85 57 56-85 85Zm235-93q-83 0-141.5-58.5T280-840h80q0 50 35 85t85 35q50 0 85-35t35-85h80q0 83-58.5 141.5T480-640Zm0-200Zm-40 360v-120h80v120h-80Zm275-67-84-85 56-56 85 84-57 57Zm5-213v-80h120v80H720ZM80-120v-80q38 0 56.5-20t77.5-20q59 0 77.5 20t54.5 20q38 0 56.5-20t77.5-20q57 0 77.5 20t56.5 20q38 0 55.5-20t76.5-20q59 0 77.5 20t56.5 20v80q-57 0-77.5-20T746-160q-36 0-54.5 20T614-120q-57 0-77.5-20T480-160q-38 0-56.5 20T346-120q-59 0-76.5-20T214-160q-38 0-56.5 20T80-120Zm0-160v-80q38 0 56.5-20t77.5-20q57 0 76.5 20t55.5 20q38 0 56.5-20t77.5-20q57 0 77 20t55 20q38 0 56.5-20t77.5-20q57 0 77.5 20t56.5 20v80q-59 0-78.5-20T746-320q-36 0-54.5 20T614-280q-57 0-77.5-20T480-320q-38 0-55.5 20T348-280q-59 0-78.5-20T214-320q-36 0-56.5 20T80-280Z" /></svg>
            </div>
            <div>
              <p>sunset</p>
              <p>{sunset}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CardSunrisetSunset