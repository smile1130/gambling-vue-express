import connection from "../config/connectDB";
import jwt from 'jsonwebtoken'
import md5 from "md5";
// import e from "express";

const homePage = async (req, res) => {
    const [settings] = await connection.query('SELECT `app` FROM admin');
    let app = settings[0].app;
    return res.render("home/index.ejs", { app });
}

const activityPage = async (req, res) => {
    return res.render("checkIn/activity.ejs");
}
const livechatsupport = async (req, res) => {
    return res.render("account/livechat.ejs");
}
const GameStats = async (req, res) => {
    return res.render("member/gamestats.ejs");
}
const noticePage = async (req, res) => {
    return res.render("member/notice.ejs");
}
const rulesPage = async (req, res) => {
    return res.render("checkin/rules.ejs");
}
const notificationPage = async (req, res) => {
    return res.render("member/notification.ejs");
}
const feedbackPage = async (req, res) => {
    return res.render("member/feedback.ejs");
}

const slotjiliPage = async (req, res) => {
    return res.render("home/slotjili.ejs");
}

const apiconnectPage = async (req, res) => {
    return res.render("home/apiconnect.ejs");
}
const BetRecords = async (req, res) => {
    return res.render("member/gamerecord.ejs");
}

const popularPage = async (req, res) => {
    return res.render("home/popular.ejs");
}

const fishingPage = async (req, res) => {
    return res.render("home/fishing.ejs");
}

const sportsPage = async (req, res) => {
    return res.render("home/sports.ejs");
}

const casinoPage = async (req, res) => {
    return res.render("home/casino.ejs");
}

const rummyPage = async (req, res) => {
    return res.render("home/rummy.ejs");
}

const originalPage = async (req, res) => {
    return res.render("home/original.ejs");
}

const slotpgPage = async (req, res) => {
    return res.render("home/slotpg.ejs");
}

const slotagPage = async (req, res) => {
    return res.render("home/slotag.ejs");
}

const lotteryPage = async (req, res) => {
    return res.render("home/lottery.ejs");
}
const settingaccount = async (req, res) => {
    return res.render("member/setting.ejs");
}


const slotmgPage = async (req, res) => {
    return res.render("home/slotmg.ejs");
}

const slotjdbPage = async (req, res) => {
    return res.render("home/slotjdb.ejs");
}
const DailySignInRecord = async (req, res) => {
    return res.render("checkin/DailySignInRecord.ejs");
}
const DailySignInRules = async (req, res) => {
    return res.render("checkin/DailySignInRules.ejs");
}

const slotcq9Page = async (req, res) => {
    return res.render("home/slotcq9.ejs");
}
const mailbindpage = async (req, res) => {
    return res.render("member/mailbind.ejs");
}
const googleverify = async (req, res) => {
    return res.render("member/googleverify.ejs");
}

const slotevoPage = async (req, res) => {
    return res.render("home/slotevo.ejs");
}


const rebatePage = async (req, res) => {
    return res.render("checkIn/rebate.ejs");
}

const vipPage = async (req, res) => {
    return res.render("checkIn/vip.ejs");
}

const jackpotPage = async (req, res) => {
    return res.render("checkIn/jackpot.ejs");
}

const dailytaskPage = async (req, res) => {
    return res.render("checkIn/dailytask.ejs");
}

const invibonusPage = async (req, res) => {
    return res.render("checkIn/invibonus.ejs");
}

const checkInPage = async (req, res) => {
    return res.render("checkIn/checkIn.ejs");
}
const winningStar = async (req, res) => {
    return res.render("checkIn/jackpotwin.ejs");
}
const invirewardrule = async (req, res) => {
    return res.render("checkIn/invirule.ejs");
}

const checkDes = async (req, res) => {
    return res.render("checkIn/checkDes.ejs");
}
const selftutorialindex = async (req, res) => {
    return res.render("account/tutorialindex.ejs");
}
const tutorialindexhelp = async (req, res) => {
    return res.render("account/tutorialindexhelp.ejs");
}
const selfservice = async (req, res) => {
    return res.render("account/selfservice.ejs");
}
const winstreakbonus = async (req, res) => {
    return res.render("account/winstreakbonus.ejs");
}



const checkRecord = async (req, res) => {
    return res.render("checkIn/checkRecord.ejs");
}

const addBank = async (req, res) => {
    return res.render("wallet/addbank.ejs");
}

// promotion
const promotionPage = async (req, res) => {
    return res.render("promotion/promotion.ejs");
}

const promotion1Page = async (req, res) => {
    return res.render("promotion/promotion1.ejs");
}

const promotionmyTeamPage = async (req, res) => {
    return res.render("promotion/myTeam.ejs");
}

const promotionDesPage = async (req, res) => {
    return res.render("promotion/promotionDes.ejs");
}

const comhistoryPage = async (req, res) => {
    return res.render("promotion/comhistory.ejs");
}

const tutorialPage = async (req, res) => {
    return res.render("promotion/tutorial.ejs");
}

const bonusRecordPage = async (req, res) => {
    return res.render("promotion/bonusrecord.ejs");
}
const invirecord = async (req, res) => {
    return res.render("checkin/invirecord.ejs");
}
const settingavatar = async (req, res) => {
    return res.render("member/avatar.ejs");
}
const emailbind = async (req, res) => {
    return res.render("member/mailbind.ejs");
}

// wallet


const transactionhistoryPage = async (req, res) => {
    return res.render("wallet/transactionhistory.ejs");
}


const walletPage = async (req, res) => {
    return res.render("wallet/index.ejs");
}

const rechargePage = async (req, res) => {
    return res.render("wallet/recharge.ejs", {
        MinimumMoney: process.env.MINIMUM_MONEY
    });
}

const rechargerecordPage = async (req, res) => {
    return res.render("wallet/rechargerecord.ejs");
}

const withdrawalPage = async (req, res) => {
    return res.render("wallet/withdrawal.ejs");
}

const withdrawalrecordPage = async (req, res) => {
    return res.render("wallet/withdrawalrecord.ejs");
}
const transfer = async (req, res) => {
    return res.render("wallet/transfer.ejs");
}
const ActivityDetailsocial = async (req, res) => {
    return res.render("checkin/bonussocial.ejs");
}

//knowledgebase

const knowledgeindexifscupdate = async (req, res) => {
    return res.render("account/knowledgeindexifscupdate.ejs");
}
const knowledgeindexbankupdate = async (req, res) => {
    return res.render("account/knowledgeindexbankupdate.ejs");
}

const knowledgeindexdeposit = async (req, res) => {
    return res.render("account/knowledgeindexdeposit.ejs");
}

const knowledgeindex = async (req, res) => {
    return res.render("account/knowledge.ejs");
}
const knowledgeindexbindgoogle = async (req, res) => {
    return res.render("account/knowledgeindexbindgoogle.ejs");
}
const knowledgeindexwinstreakt = async (req, res) => {
    return res.render("account/knowledgeindexwinstreakt.ejs");
}

const knowledgeindexupdateid = async (req, res) => {
    return res.render("account/knowledgeindexupdateid.ejs");
}
const knowledgeindexretriveid = async (req, res) => {
    return res.render("account/knowledgeindexretriveid.ejs");
}
const knowledgeindexdeletebank = async (req, res) => {
    return res.render("account/knowledgeindexdeletebank.ejs");
}
const knowledgeindexdeleteoldusdt = async (req, res) => {
    return res.render("account/knowledgeindexdeleteoldusdt.ejs");
}

const supportSubmit = async (req, res) => {

  
        let memb_id = req.body.account;
        let messa = JSON.stringify(req.body);
     

        let sql = 'INSERT INTO `support` SET member_id = ?, message = ?, admin_msg = ?';
            await connection.query(sql, [memb_id, messa, ""]);
            return res.status(200).json({
                message: `Received successfully `,
                status: true,
            });
   
}
// member page
const mianPage = async (req, res) => {
    let auth = req.cookies.auth;
    const [user] = await connection.query('SELECT `level` FROM users WHERE `token` = ? ', [auth]);
    const [settings] = await connection.query('SELECT `cskh` FROM admin');
    let cskh = settings[0].cskh;
    let level = user[0].level;
    return res.render("member/index.ejs", { level, cskh });
}
const aboutPage = async (req, res) => {
    return res.render("member/about/index.ejs");
}
const DailySignIn = async (req, res) => {
    return res.render("checkin/DailySignIn.ejs");
}
const language = async (req, res) => {
    return res.render("member/language.ejs");
}
const gamestatPage = async (req, res) => {
    return res.render("member/gamestatpage.ejs");
}
const recordsalary = async (req, res) => {
    return res.render("member/about/recordsalary.ejs");
}

const privacyPolicy = async (req, res) => {
    return res.render("member/about/privacyPolicy.ejs");
}

const newtutorial = async (req, res) => {
    return res.render("member/newtutorial.ejs");
}

const forgot = async (req, res) => {
    let auth = req.cookies.auth;
    const [user] = await connection.query('SELECT `time_otp` FROM users WHERE token = ? ', [auth]);
    let time = user[0].time_otp;
    return res.render("member/forgot.ejs", { time });
}

const redenvelopes = async (req, res) => {
    return res.render("member/redenvelopes.ejs");
}
const DailyTasksRecord = async (req, res) => {
    return res.render("checkin/DailyTasksRecord.ejs");
}

const riskAgreement = async (req, res) => {
    return res.render("member/about/riskAgreement.ejs");
}
const RebateRatio = async (req, res) => {
    return res.render("promotion/rebateratio.ejs");
}
const selfservicecentertutorial = async (req, res) => {
    return res.render("support/selfservicecentertutorial.ejs");
}

const myProfilePage = async (req, res) => {
    return res.render("member/myProfile.ejs");
}
const ActivityDetail = async (req, res) => {
    return res.render("checkin/ActivityDetail.ejs");
}
const withdrawknowledge = async (req, res) => {
    return res.render("account/supportwithdraw.ejs");
}
const FirstRecharge = async (req, res) => {
    return res.render("checkin/FirstRecharge.ejs");
}
const withdrawissueknowledge = async (req, res) => {
    return res.render("account/withdrawissueknowledge.ejs");
}
const getSalaryRecord = async (req, res) => {
    const auth = req.cookies.auth;

    const [rows] = await connection.query(`SELECT * FROM users WHERE token = ?`, [auth]);
    let rowstr = rows[0];
    if (!rows) {
        return res.status(200).json({
            message: 'Failed',
            status: false,

        });
    }
    const [getPhone] = await connection.query(
        `SELECT * FROM salary WHERE phone = ? ORDER BY time DESC`,
        [rowstr.phone]
    );


    console.log("asdasdasd : " + [rows.phone])
    return res.status(200).json({
        message: 'Success',
        status: true,
        data: {

        },
        rows: getPhone,
    })
}
module.exports = {
    homePage,
    slotjiliPage,
    apiconnectPage,
    rummyPage,
    fishingPage,
    originalPage,
    casinoPage,
    sportsPage,
    popularPage,
    slotpgPage,
    slotagPage,
    slotmgPage,
    lotteryPage,
    slotjdbPage,
    slotcq9Page,
    slotevoPage,
    checkInPage,
    invibonusPage,
    rebatePage,
    jackpotPage,
    vipPage,
    activityPage,
    dailytaskPage,
    promotionPage,
    promotion1Page,
    walletPage,
    mianPage,
    myProfilePage,
    promotionmyTeamPage,
    promotionDesPage,
    comhistoryPage,
    tutorialPage,
    bonusRecordPage,
    rechargePage,
    rechargerecordPage,
    withdrawalPage,
    withdrawalrecordPage,
    aboutPage,
    privacyPolicy,
    riskAgreement,
    newtutorial,
    redenvelopes,
    forgot,
    checkDes,
    checkRecord,
    addBank,
    transfer,
    recordsalary,
    getSalaryRecord,
    transactionhistoryPage,
    language,
    gamestatPage,
    settingaccount,
    BetRecords,
    GameStats,
    notificationPage,
    feedbackPage,
    noticePage,
    rulesPage,
    winningStar,
    invirewardrule,
    invirecord,
    settingavatar,
    emailbind,
    mailbindpage,
    googleverify,
    FirstRecharge,
    ActivityDetail,
    ActivityDetailsocial,
    DailySignIn,
    DailySignInRecord,
    DailySignInRules,
    DailyTasksRecord,
    RebateRatio,
    knowledgeindex,
    knowledgeindexdeposit,
    knowledgeindexifscupdate,
    knowledgeindexbankupdate,
    knowledgeindexdeletebank,
    knowledgeindexdeleteoldusdt,
    knowledgeindexupdateid,
    knowledgeindexretriveid,
    knowledgeindexbindgoogle,
    knowledgeindexwinstreakt,
    supportSubmit,
    livechatsupport,
    withdrawknowledge,
    withdrawissueknowledge,
    tutorialindexhelp,
    selftutorialindex,
    selfservice,
    winstreakbonus,
    selfservicecentertutorial,
}