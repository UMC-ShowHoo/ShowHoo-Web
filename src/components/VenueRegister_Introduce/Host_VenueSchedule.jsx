import "../../styles/Eojin/Host_VenueSchedule.css";

const Host_VenueSchedule = () => {
    return (
        <div className="Host_VenueSchedule">
            <h4>대관 일정</h4>
            <p>원하는 날짜를 클릭해<span className="highlight">&nbsp;휴무일을 입력해주세요</span></p>
            <div className="calender"></div>
        </div>
    )
}

export default Host_VenueSchedule;