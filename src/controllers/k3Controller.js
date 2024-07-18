import connection from "../config/connectDB";
require('dotenv').config();

const K3Page = async (req, res) => {
    return res.render("bet/k3/k3.ejs");
}

const isNumber = (params) => {
    let pattern = /^[0-9]*\d$/;
    return pattern.test(params);
}

function formateT(params) {
    let result = (params < 10) ? "0" + params : params;
    return result;
}

function timerJoin(params = '', addHours = 0) {
    let date = '';
        if (params) {
            date = new Date(Number(params));
        } else {
            date = new Date();
        }
    
        date.setHours(date.getHours() + addHours);
    
        let years = formateT(date.getFullYear());
        let months = formateT(date.getMonth() + 1);
        let days = formateT(date.getDate());
    
        let hours = date.getHours() % 12;
        hours = hours === 0 ? 12 : hours;
        let ampm = date.getHours() < 12 ? "AM" : "PM";
    
        let minutes = formateT(date.getMinutes());
        let seconds = formateT(date.getSeconds());
    
        return years + '-' + months + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    }

const rosesPlus = async (auth, money) => {
    const [level] = await connection.query('SELECT * FROM level ');
    let level0 = level[0];

    const [user] = await connection.query('SELECT `phone`, `code`, `invite` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ', [auth]);
    let userInfo = user[0];
    const [f1] = await connection.query('SELECT `phone`, `code`, `invite`, `rank` FROM users WHERE code = ? AND veri = 1  LIMIT 1 ', [userInfo.invite]);
    if (money >= 10000) {
        if (f1.length > 0) {
            let infoF1 = f1[0];
            let rosesF1 = (money / 100) * level0.f1;
            await connection.query('UPDATE users SET money = money + ?, roses_f1 = roses_f1 + ?, roses_f = roses_f + ?, roses_today = roses_today + ? WHERE phone = ? ', [rosesF1, rosesF1, rosesF1, rosesF1, infoF1.phone]);
            const [f2] = await connection.query('SELECT `phone`, `code`, `invite`, `rank` FROM users WHERE code = ? AND veri = 1  LIMIT 1 ', [infoF1.invite]);
            if (f2.length > 0) {
                let infoF2 = f2[0];
                let rosesF2 = (money / 100) * level0.f2;
                await connection.query('UPDATE users SET money = money + ?, roses_f = roses_f + ?, roses_today = roses_today + ? WHERE phone = ? ', [rosesF2, rosesF2, rosesF2, infoF2.phone]);
                const [f3] = await connection.query('SELECT `phone`, `code`, `invite`, `rank` FROM users WHERE code = ? AND veri = 1  LIMIT 1 ', [infoF2.invite]);
                if (f3.length > 0) {
                    let infoF3 = f3[0];
                    let rosesF3 = (money / 100) * level0.f3;
                    await connection.query('UPDATE users SET money = money + ?, roses_f = roses_f + ?, roses_today = roses_today + ? WHERE phone = ? ', [rosesF3, rosesF3, rosesF3, infoF3.phone]);
                    const [f4] = await connection.query('SELECT `phone`, `code`, `invite`, `rank` FROM users WHERE code = ? AND veri = 1  LIMIT 1 ', [infoF3.invite]);
                    if (f4.length > 0) {
                        let infoF4 = f4[0];
                        let rosesF4 = (money / 100) * level0.f4;
                        await connection.query('UPDATE users SET money = money + ?, roses_f = roses_f + ?, roses_today = roses_today + ? WHERE phone = ? ', [rosesF4, rosesF4, rosesF4, infoF4.phone]);
                    }
                }
            }

        }
    }
}

const validateBet = async (join, list_join, x, money, game) => {
    let checkJoin = isNumber(list_join);
    let checkX = isNumber(x);
    const checks = ['a', 'b', 'c', 'd', 'e', 'total'].includes(join);
    const checkGame = ['1', '3', '5', '10'].includes(String(game));
    const checkMoney = ['1000', '10000', '100000', '1000000'].includes(money);

    if (!checks || list_join.length > 10 || !checkX || !checkMoney || !checkGame) {
        return false;
    }

    if (checkJoin) {
        let arr = list_join.split('');
        let length = arr.length;
        for (let i = 0; i < length; i++) {
            const joinNum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(arr[i]);
            if (!joinNum) {
                return false;
            }
        }
    } else {
        let arr = list_join.split('');
        let length = arr.length;
        for (let i = 0; i < length; i++) {
            const joinStr = ["c", "l", "b", "s"].includes(arr[i]);
            if (!joinStr) {
                return false;
            }
        }

    }

    return true;
}

const betK3 = async (req, res) => {
    try {
        let { listJoin, game, gameJoin, xvalue, money } = req.body;
        let auth = req.cookies.auth;

        // let validate = await validateBet(join, list_join, x, money, game);

        // if (!validate) {
        //     return res.status(200).json({
        //         message: 'Đặt cược không hợp lệ',
        //         status: false
        //     });
        // }

        const [k3Now] = await connection.query(`SELECT period FROM k3 WHERE status = 0 AND game = ${game} ORDER BY id DESC LIMIT 1 `);
        const [user] = await connection.query('SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ', [auth]);
        if (k3Now.length < 1 || user.length < 1) {
            return res.status(200).json({
                message: 'Error!',
                status: false
            });
        }
        let userInfo = user[0];
        let period = k3Now[0];

        let date = new Date();
        let years = formateT(date.getFullYear());
        let months = formateT(date.getMonth() + 1);
        let days = formateT(date.getDate());
        let id_product = years + months + days + Math.floor(Math.random() * 1000000000000000);

        let total = 0;
        if (gameJoin == 1) {
            total = money * xvalue * (String(listJoin).split(',').length);
        } else if (gameJoin == 2) {
            let twoSame = listJoin.split('@')[0]; // Chọn 2 số phù hợp
            let motDuyNhat = listJoin.split('@')[1]; // Chọn một cặp số duy nhất
            if (twoSame.length > 0) {
                twoSame = twoSame.split(',').length;
            }
            let lengthArr = 0;
            let count = 0;
            if (motDuyNhat.length > 0) {
                let arr = motDuyNhat.split('&');
                for (let i = 0; i < arr.length; i++) {
                    motDuyNhat = arr[i].split('|');
                    count = motDuyNhat[1].split(',').length;
                }
                lengthArr = arr.length;
                count = count;
            }
            total = money * xvalue * (lengthArr * count) + (twoSame * money * xvalue);
        } else if (gameJoin == 3) {
            let baDuyNhat = listJoin.split('@')[0]; // Chọn 3 số duy nhất
            let countBaDuyNhat = 0;
            if (baDuyNhat.length > 0) {
                countBaDuyNhat = baDuyNhat.split(',').length;
            }
            let threeSame = listJoin.split('@')[1].length; // Chọn 3 số giống nhau
            total = money * xvalue * countBaDuyNhat + (threeSame * money * xvalue);
        } else if (gameJoin == 4) {
            let threeNumberUnlike = listJoin.split('@')[0]; // Chọn 3 số duy nhất
            let twoLienTiep = listJoin.split('@')[1]; // Chọn 3 số liên tiếp
            let twoNumberUnlike = listJoin.split('@')[2]; // Chọn 3 số duy nhất

            let threeUn = 0;
            if (threeNumberUnlike.length > 0) {
                let arr = threeNumberUnlike.split(',').length;
                if (arr <= 4) {
                    threeUn += xvalue * (money * arr);
                }
                if (arr == 5) {
                    threeUn += xvalue * (money * arr) * 2;
                }
                if (arr == 6) {
                    threeUn += xvalue * (money * 5) * 4;
                }
            }
            let twoUn = 0;
            if (twoNumberUnlike.length > 0) {
                let arr = twoNumberUnlike.split(',').length;
                if (arr <= 3) {
                    twoUn += xvalue * (money * arr);
                }
                if (arr == 4) {
                    twoUn += xvalue * (money * arr) * 1.5;
                }
                if (arr == 5) {
                    twoUn += xvalue * (money * arr) * 2;
                }
                if (arr == 6) {
                    twoUn += xvalue * (money * arr * 2.5);
                }
            }
            let UnlienTiep = 0;
            if (twoLienTiep == 'u') {
                UnlienTiep += xvalue * money;
            }
            total = threeUn + twoUn + UnlienTiep;
        }
        let fee = total * 0.02;
        let price = total - fee;

        let typeGame = '';
        if (gameJoin == 1) typeGame = 'total';
        if (gameJoin == 2) typeGame = 'two-same';
        if (gameJoin == 3) typeGame = 'three-same';
        if (gameJoin == 4) typeGame = 'unlike';


        let check = userInfo.money - total;
        if (check >= 0) {
            let timeNow = Date.now();
            const sql = `INSERT INTO result_k3 SET id_product = ?,phone = ?,code = ?,invite = ?,stage = ?,level = ?,money = ?,price = ?,amount = ?,fee = ?,game = ?,join_bet = ?, typeGame = ?,bet = ?,status = ?,time = ?`;
            await connection.execute(sql, [id_product, userInfo.phone, userInfo.code, userInfo.invite, period.period, userInfo.level, total, price, xvalue, fee, game, gameJoin, typeGame, listJoin, 0, timeNow]);
            await connection.execute('UPDATE `users` SET `money` = `money` - ? WHERE `token` = ? ', [total, auth]);
            const [users] = await connection.query('SELECT `money`, `level` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ', [auth]);
            await rosesPlus(auth, total);
            const [level] = await connection.query('SELECT * FROM level ');
            let level0 = level[0];
            const sql2 = `INSERT INTO roses SET phone = ?,code = ?,invite = ?,f1 = ?,f2 = ?,f3 = ?,f4 = ?,time = ?`;
            let total_m = total;
            let f1 = (total_m / 100) * level0.f1;
            let f2 = (total_m / 100) * level0.f2;
            let f3 = (total_m / 100) * level0.f3;
            let f4 = (total_m / 100) * level0.f4;
            await connection.execute(sql2, [userInfo.phone, userInfo.code, userInfo.invite, f1, f2, f3, f4, timeNow]);
            return res.status(200).json({
                message: 'Bet Succeed',
                status: true,
                // data: result,
                change: users[0].level,
                money: users[0].money,
            });
        } else {
            return res.status(200).json({
                message: 'Insufficient Balance',
                status: false
            });
        }
    } catch (error) {
    }
}

function makeid(length) {
    var result = '';
    var characters = '123456';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const addK3 = async (game) => {
    try {
        let join = '';
        if (game == 1) join = 'k3d';
        if (game == 3) join = 'k3d3';
        if (game == 5) join = 'k3d5';
        if (game == 10) join = 'k3d10';

        let result2 = makeid(3);
        let timeNow = Date.now();
        let [k5D] = await connection.query(`SELECT period FROM k3 WHERE status = 0 AND game = ${game} ORDER BY id DESC LIMIT 1 `);
        const [setting] = await connection.query('SELECT * FROM `admin` ');
        let period = k5D[0].period;

        let nextResult = '';
        if (game == 1) nextResult = setting[0].k3d;
        if (game == 3) nextResult = setting[0].k3d3;
        if (game == 5) nextResult = setting[0].k3d5;
        if (game == 10) nextResult = setting[0].k3d10;

        let newArr = '';
        if (nextResult == '-1') {
            await connection.execute(`UPDATE k3 SET result = ?,status = ? WHERE period = ? AND game = "${game}"`, [result2, 1, period]);
            newArr = '-1';
        } else {
            let result = '';
            let arr = nextResult.split('|');
            let check = arr.length;
            if (check == 1) {
                newArr = '-1';
            } else {
                for (let i = 1; i < arr.length; i++) {
                    newArr += arr[i] + '|';
                }
                newArr = newArr.slice(0, -1);
            }
            result = arr[0];
            await connection.execute(`UPDATE k3 SET result = ?,status = ? WHERE period = ? AND game = ${game}`, [result, 1, period]);
        }
        const sql = `INSERT INTO k3 SET period = ?, result = ?, game = ?, status = ?, time = ?`;
        await connection.execute(sql, [Number(period) + 1, 0, game, 0, timeNow]);

        if (game == 1) join = 'k3d';
        if (game == 3) join = 'k3d3';
        if (game == 5) join = 'k3d5';
        if (game == 10) join = 'k3d10';

        await connection.execute(`UPDATE admin SET ${join} = ?`, [newArr]);
    } catch (error) {
        if (error) {
        }
    }
}

async function funHanding(game) {
    const [k5d] = await connection.query(`SELECT * FROM k3 WHERE status != 0 AND game = ${game} ORDER BY id DESC LIMIT 1 `);
    let k5dInfo = k5d[0];

    // update ket qua
    await connection.execute(`UPDATE result_k3 SET result = ? WHERE status = 0 AND game = ${game}`, [k5dInfo.result]);
    let result = String(k5dInfo.result).split('');
    let total = 0;
    for (let i = 0; i < result.length; i++) {
        total += Number(result[i]);
    }

    // xử lý game Tổng số
    const [totalNumber] = await connection.execute(`SELECT id, bet FROM result_k3 WHERE status = 0 AND game = ${game} AND typeGame = 'total' `);
    let totalN = totalNumber.length;
    for (let i = 0; i < totalN; i++) {
        let sult = totalNumber[i].bet.split(',');
        // let result = sult.includes(String(total));
        // if (!result) {
        //     await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [totalNumber[i].id]);
        // }
        let lengWin = sult.filter(function(age) {
            return age == total;
        });

        let check1 = false;
        let check2 = false;
        let check3 = false;
        let check4 = false;
        if (total >= 3 && total <= 10 && sult.includes('s')) {
            check1 = true;
        } else {
            check1 = false;
        }
        if (total >= 11 && total <= 18 && sult.includes('b')) {
            check2 = true;
        } else {
            check2 = false;
        }
        if (total % 2 == 0 && sult.includes('c')) {
            check3 = true;
        } else {
            check3 = false;
        }
        if (total % 2 != 0 && sult.includes('l')) {
            check4 = true;
        } else {
            check4 = false;
        }
        if (!check1 && !check2 && !check3 && !check4) {
            await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [totalNumber[i].id]);
        }
        if (lengWin.length >= 1) {
            await connection.execute(`UPDATE result_k3 SET status = 0 WHERE id = ? `, [totalNumber[i].id]);
        }
    }

    // xử lý game 2 số trùng nhau
    const [totaltwoSame] = await connection.execute(`SELECT id, bet FROM result_k3 WHERE status = 0 AND game = ${game} AND typeGame = 'two-same' `);
    let totalTwoSame = totaltwoSame.length;
    for (let i = 0; i < totalTwoSame; i++) {
        let sult = totaltwoSame[i].bet.split('@');
        let id = totaltwoSame[i].id;
        if (sult[0].length > 0 && sult[1].length > 0) {
            let array = sult[0].split(',');
            let kq = String(k5dInfo.result).split('');
            let kq1 = kq[0] + kq[1];
            let kq2 = kq[1] + kq[2];

            let check1 = false;
            let check2 = false;

            let array2 = sult[1].split('&');
            for (let i = 0; i < array2.length; i++) {
                let newArr = array2[i].split('|')[0];
                let newArr2 = array2[i].split('|')[1].split(',');
                let resultA1 = newArr.includes(String(kq1));
                let resultA2 = newArr.includes(String(kq2));
                if (!resultA1 && !resultA2) {
                    check1 = true;
                } else if (resultA1 && !resultA2) {
                    let resultA4 = newArr2.includes(String(kq[2]));
                    if (!resultA4) {
                        check1 = true;
                    }
                } else if (!resultA1 && resultA2) {
                    let resultA3 = newArr2.includes(String(kq[0]));
                    if (!resultA3) {
                        check1 = true;
                    }
                }
            }

            let result1 = array.includes(String(kq1));
            let result2 = array.includes(String(kq2));
            if (!result1 && !result2) {
                check2 = true;
            }
            if (check1 && check2) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }
        } else if (sult[0].length > 0 && sult[1].length <= 0) {
            let array = sult[0].split(',');
            let kq = String(k5dInfo.result).split('');
            let kq1 = kq[0] + kq[1];
            let kq2 = kq[1] + kq[2];
            let result1 = array.includes(String(kq1));
            let result2 = array.includes(String(kq2));
            if (!result1 && !result2) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }
        } else if (sult[0].length <= 0 && sult[1].length > 0) {
            let kq = String(k5dInfo.result).split('');
            let kq1 = kq[0] + kq[1];
            let kq2 = kq[1] + kq[2];
            let kq3 = kq[0];
            let kq4 = kq[2];
            let check = false;

            let array2 = sult[1].split('&');
            for (let i = 0; i < array2.length; i++) {
                let newArr = array2[i].split('|')[0];
                let newArr2 = array2[i].split('|')[1].split(',');
                let resultA1 = newArr.includes(String(kq1));
                let resultA2 = newArr.includes(String(kq2));
                let resultA3 = newArr2.includes(String(kq3));
                let resultA4 = newArr2.includes(String(kq4));
                if (!resultA1 && !resultA2) {
                    if (!resultA3 && !resultA4) {
                        await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
                    }
                } else if (resultA1 && !resultA2) {
                    let resultA4 = newArr2.includes(String(kq[2]));
                    if (resultA4) {
                        check = true;
                    }
                } else if (!resultA1 && resultA2) {
                    let resultA3 = newArr2.includes(String(kq[0]));
                    if (resultA3) {
                        check = true;
                    }
                }
            }
            if (!check) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }
        }

    }

    // xử lý game 3 số trùng nhau
    const [ThreeSame] = await connection.execute(`SELECT id, bet FROM result_k3 WHERE status = 0 AND game = ${game} AND typeGame = 'three-same' `);
    let ThreeSameL = ThreeSame.length;
    for (let i = 0; i < ThreeSameL; i++) {
        let sult = ThreeSame[i].bet.split('@');
        let id = ThreeSame[i].id;
        if (sult[0].length > 0 && sult[1].length > 0) {
            let array = sult[0].split(',');
            let kq = String(k5dInfo.result);

            let check1 = false;
            let check2 = false;

            let resultA1 = array.includes(String(kq));
            if (!resultA1) {
                check1 = true;
            }
            let result = ['111', '222', '333', '444', '555', '666'].includes(String(kq));
            if (!result) {
                check2 = true;
            }
            if (check1 && check2) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }
        } else if (sult[0].length > 0 && sult[1].length <= 0) {
            let array = sult[0].split(',');
            let kq = String(k5dInfo.result);
            let result = array.includes(String(kq));
            if (!result) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }
        } else if (sult[0].length <= 0 && sult[1].length > 0) {
            let kq = String(k5dInfo.result);
            let result = ['111', '222', '333', '444', '555', '666'].includes(String(kq));
            if (!result) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }
        }

    }

    // xử lý game 3 số khác nhau
    const [Unlike] = await connection.execute(`SELECT id, bet FROM result_k3 WHERE status = 0 AND game = ${game} AND typeGame = 'unlike' `);
    let Unlikes = Unlike.length;
    for (let i = 0; i < Unlikes; i++) {
        let sult = Unlike[i].bet.split('@');
        let id = Unlike[i].id;

        if (sult[0].length > 1 && sult[1] == 'u' && sult[2].length > 1) {
            let array = sult[0].split(',');
            let array2 = sult[2].split(',');
            let kq = String(k5dInfo.result).split('');
            let check1 = false;
            let check2 = false;
            let check3 = false;

            for (let i = 0; i < kq.length; i++) {
                let resultA1 = array.includes(String(kq[i]));
                if (resultA1) {
                    check1 = true;
                }
            }

            let kq1 = kq[0] + kq[1];
            let kq2 = kq[1] + kq[2];
            let kq3 = kq[0] + kq[2];
            for (let i = 0; i < kq.length; i++) {
                let resultA1 = ['11', '22', '33', '44', '55', '66'].includes(String(kq1));
                let resultA2 = ['11', '22', '33', '44', '55', '66'].includes(String(kq2));
                let resultA3 = ['11', '22', '33', '44', '55', '66'].includes(String(kq3));
                if (resultA1 || resultA2 || resultA3) {
                    check3 = true;
                }
            }

            for (let i = 0; i < kq.length; i++) {
                let resultA1 = array2.includes(String(kq[i]));
                if (resultA1) {
                    check2 = true;
                }
            }

            if (check1 && check2 && check3) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }

        } else if (sult[0].length > 1 && sult[1] == 'y' && sult[2].length > 1) {
            let array = sult[0].split(',');
            let array2 = sult[2].split(',');
            let kq = String(k5dInfo.result).split('');
            let check1 = false;
            let check2 = false;

            for (let i = 0; i < kq.length; i++) {
                let resultA1 = array.includes(String(kq[i]));
                if (resultA1) {
                    check1 = true;
                }
            }

            for (let i = 0; i < kq.length; i++) {
                let resultA1 = array2.includes(String(kq[i]));
                if (resultA1) {
                    check2 = true;
                }
            }

            if (check1 && check2) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }
        } else if (sult[0].length > 1 && sult[1] == 'u' && sult[2].length <= 1) {
            let array = sult[0].split(',');
            let array2 = sult[2].split(',');
            let kq = String(k5dInfo.result).split('');
            let check1 = false;
            let check2 = false;

            for (let i = 0; i < kq.length; i++) {
                let resultA1 = array.includes(String(kq[i]));
                if (resultA1) {
                    check1 = true;
                }
            }

            let kq1 = kq[0] + kq[1];
            let kq2 = kq[1] + kq[2];
            let kq3 = kq[0] + kq[2];
            for (let i = 0; i < kq.length; i++) {
                let resultA1 = ['11', '22', '33', '44', '55', '66'].includes(String(kq1));
                let resultA2 = ['11', '22', '33', '44', '55', '66'].includes(String(kq2));
                let resultA3 = ['11', '22', '33', '44', '55', '66'].includes(String(kq3));
                if (resultA1 || resultA2 || resultA3) {
                    check2 = true;
                }
            }

            if (check1 && check2) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }
        } else if (sult[0].length <= 1 && sult[1] == 'u' && sult[2].length > 1) {
            let array = sult[0].split(',');
            let array2 = sult[2].split(',');
            let kq = String(k5dInfo.result).split('');
            let check1 = false;
            let check2 = false;

            for (let i = 0; i < kq.length; i++) {
                let resultA1 = array2.includes(String(kq[i]));
                if (resultA1) {
                    check1 = true;
                }
            }

            let kq1 = kq[0] + kq[1];
            let kq2 = kq[1] + kq[2];
            let kq3 = kq[0] + kq[2];
            for (let i = 0; i < kq.length; i++) {
                let resultA1 = ['11', '22', '33', '44', '55', '66'].includes(String(kq1));
                let resultA2 = ['11', '22', '33', '44', '55', '66'].includes(String(kq2));
                let resultA3 = ['11', '22', '33', '44', '55', '66'].includes(String(kq3));
                if (resultA1 || resultA2 || resultA3) {
                    check2 = true;
                }
            }

            if (check1 && check2) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }
        } else if (sult[0].length > 1 && sult[1] == 'y' && sult[2].length <= 1) {
            let array = sult[0].split(',');
            let array2 = sult[2].split(',');
            let kq = String(k5dInfo.result).split('');
            let check1 = false;

            for (let i = 0; i < kq.length; i++) {
                let resultA1 = array.includes(String(kq[i]));
                if (resultA1) {
                    check1 = true;
                }
            }

            if (check1) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }
        } else if (sult[0].length <= 1 && sult[1] == 'u' && sult[2].length <= 1) {
            let array = sult[0].split(',');
            let array2 = sult[2].split(',');
            let kq = String(k5dInfo.result).split('');
            let check1 = false;

            let kq1 = kq[0] + kq[1];
            let kq2 = kq[1] + kq[2];
            let kq3 = kq[0] + kq[2];
            for (let i = 0; i < kq.length; i++) {
                let resultA1 = ['11', '22', '33', '44', '55', '66'].includes(String(kq1));
                let resultA2 = ['11', '22', '33', '44', '55', '66'].includes(String(kq2));
                let resultA3 = ['11', '22', '33', '44', '55', '66'].includes(String(kq3));
                if (resultA1 || resultA2 || resultA3) {
                    check1 = true;
                }
            }
            if (check1) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }
        } else if (sult[0].length <= 1 && sult[1] == 'y' && sult[2].length > 1) {
            let array = sult[0].split(',');
            let array2 = sult[2].split(',');
            let kq = String(k5dInfo.result).split('');
            let check1 = false;

            for (let i = 0; i < kq.length; i++) {
                let resultA1 = array2.includes(String(kq[i]));
                if (resultA1) {
                    check1 = true;
                }
            }

            if (check1) {
                await connection.execute(`UPDATE result_k3 SET status = 2 WHERE id = ? `, [id]);
            }
        }   
    }
}

const priceGet = {
    total: {
        't3': 207.36,
        't4': 69.12,
        't5': 34.56,
        't6': 20.74,
        't7': 13.83,
        't8': 9.88,
        't9': 8.3,
        't10': 7.68,
        't11': 7.68,
        't12': 8.3,
        't13': 9.88,
        't14': 13.83,
        't15': 20.74,
        't16': 34.56,
        't17': 69.12,
        't18': 207.36,
        'b': 1.92,
        's': 1.92,
        'l': 1.92,
        'c': 1.92,
    },
    two: {
        twoSame: 13.83,
        twoD: 69.12
    },
    three: {
        threeD: 207.36,
        threeSame: 34.56
    },
    unlike: {
        unlikeThree: 34.56,
        threeL: 8.64,
        unlikeTwo: 6.91
    }
}

async function plusMoney(game) {
    const [order] = await connection.execute(`SELECT id, phone, bet, price, money, fee, amount, result, typeGame FROM result_k3 WHERE status = 0 AND game = ${game} `);
    for (let i = 0; i < order.length; i++) {
        let orders = order[i];
        let phone = orders.phone;
        let id = orders.id;
        let nhan_duoc = 0;
        let result = orders.result;
        if (orders.typeGame == "total") {
            let arr = orders.bet.split(',');
            let totalResult = orders.result.split('');
            let totalResult2 = 0;
            for (let i = 0; i < 3; i++) {
                totalResult2 += Number(totalResult[i]);
            }
            let total = (orders.money / arr.length / orders.amount);
            let fee = total * 0.02;
            let price = total - fee;
            
            let lengWin = arr.filter(function(age) {
                return age == totalResult2;
            });

            let lengWin2 = arr.filter(function(age) {
                return !isNumber(age);
            });

            if (totalResult2 % 2 == 0 && lengWin2.includes('c')) {
                nhan_duoc += price * 1.92;
            }

            if (totalResult2 % 2 != 0 && lengWin2.includes('l')) {
                nhan_duoc += price * 1.92;
            }

            if (totalResult2 >= 11 && totalResult2 <= 18 && lengWin2.includes('b')) {
                nhan_duoc += price * 1.92;
            }

            if (totalResult2 >= 3 && totalResult2 <= 11 && lengWin2.includes('s')) {
                nhan_duoc += price * 1.92;
            }
            
            let get = 0;
            switch (lengWin[0]) {
                case '3':
                    get = 207.36;
                    break;
                case '3':
                    get = 69.12;
                    break;
                case '5':
                    get = 34.56;
                    break;
                case '6':
                    get = 20.74;
                    break;
                case '7':
                    get = 13.83;
                    break;
                case '8':
                    get = 9.88;
                    break;
                case '9':
                    get = 8.3;
                    break;
                case '10':
                    get = 7.68;
                    break;
                case '11':
                    get = 7.68;
                    break;
                case '12':
                    get = 8.3;
                    break;
                case '13':
                    get = 9.88;
                    break;
                case '14':
                    get = 13.83;
                    break;
                case '15':
                    get = 20.74;
                    break;
                case '16':
                    get = 34.56;
                    break;
                case '17':
                    get = 69.12;
                    break;
                case '18':
                    get = 207.36;
                    break;
            }
            nhan_duoc += price * get;
            await connection.execute('UPDATE `result_k3` SET `get` = ?, `status` = 1 WHERE `id` = ? ', [nhan_duoc, id]);
            const sql = 'UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ? ';
            await connection.execute(sql, [nhan_duoc, phone]);
        }
        nhan_duoc = 0;
        if (orders.typeGame == "two-same") {
            let kq = result.split('');
            let kq1 = kq[0] + kq[1];
            let kq2 = kq[1] + kq[2];
            let array = orders.bet.split('@');
            let arr1 = array[0].split(',');
            let arr2 = array[1];
            let arr3 = array[1].split('&');
            for (let i = 0; i < arr1.length; i++) {
                if(arr1[i] != "") {
                    let check1 = arr1[i].includes(kq1);
                    let check2 = arr1[i].includes(kq2);
                    if (check1 || check2) {
                        let lengthArr = 0;
                        let count = 0;
                        if (arr2.length > 0) {
                            let arr = arr2.split('&');
                            for (let i = 0; i < arr.length; i++) {
                                arr2 = arr[i].split('|');
                                count = arr2[1].split(',').length;
                            }
                            lengthArr = arr.length;
                            count = count;
                        }
                        let total = orders.money / orders.amount / (lengthArr + arr1.length);
                        nhan_duoc += total * 12.83;
                    }
                }
            }
            arr2 = array[1];
            for (let i = 0; i < arr3.length; i++) {
                if(arr3[i] != "") {
                    let files = arr3[i].split('|');
                    let check1 = files[0].includes(kq1);
                    let check2 = files[0].includes(kq2);
                    if (check1 || check2) {
                        let lengthArr = 0;
                        let count = 0;
                        if (arr2.length > 0) {
                            let arr = arr2.split('&');
                            for (let i = 0; i < arr.length; i++) {
                                arr2 = arr[i].split('|');
                                count = arr2[1].split(',').length;
                            }
                            lengthArr = arr.length;
                            count = count;
                        }
                        let bale = 0;
                        for (let i = 0; i < arr1.length; i++) {
                            if (arr1[i] != "") {
                                bale = arr1.length;
                            }
                        }
                        let total = orders.money / orders.amount / (lengthArr + bale);
                        nhan_duoc += total * 69.12;
                    }
                }
            }
            nhan_duoc -= orders.fee;

            await connection.execute('UPDATE `result_k3` SET `get` = ?, `status` = 1 WHERE `id` = ? ', [nhan_duoc, id]);
            const sql = 'UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ? ';
            await connection.execute(sql, [nhan_duoc, phone]);
        }

        nhan_duoc = 0;
        if (orders.typeGame == "three-same") {
            let kq = result;
            let array = orders.bet.split('@');
            let arr1 = array[0].split(',');
            let arr2 = array[1];
            
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] != "") {
                    let check1 = arr1[i].includes(kq);
                    let bala = 0;
                    if (arr2 != "") {
                        bala = 1;
                    }
                    if (check1) {
                        let total = (orders.money / (arr1.length + bala) / orders.amount);
                        nhan_duoc += total * 207.36 - orders.fee;
                    }
                }
            }
            if (arr2 != "") {
                let bala = 0;
                for (let i = 0; i < arr1.length; i++) {
                    if (arr1[i] != "") {
                        bala = arr1.length;
                    }
                }
                let total = (orders.money / (1 + bala) / orders.amount);
                nhan_duoc += total * 34.56 - orders.fee;
            }
            await connection.execute('UPDATE `result_k3` SET `get` = ?, `status` = 1 WHERE `id` = ? ', [nhan_duoc, id]);
            const sql = 'UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ? ';
            await connection.execute(sql, [nhan_duoc, phone]);
        }

        nhan_duoc = 0;
        if (orders.typeGame == "unlike") {
            let kq = result.split('');
            let array = orders.bet.split('@');
            let arr1 = array[0].split(',');
            let arr2 = array[1];
            let arr3 = array[2].split(',');
            
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] != "") {
                    let check1 = kq.includes(arr1[i]);
                    let bala = 0;
                    let bala2 = 0;
                    for (let i = 0; i < arr3.length; i++) {
                        if (arr3[i].length != "") {
                            bala = arr3.length;
                        }
                    }
                    if (arr2 == "u") {
                        bala2 = 1;
                    }
                    if (!check1) {
                        let total = (orders.money / (arr1.length + bala + bala2) / orders.amount);
                        nhan_duoc += total * 34.56 - orders.fee;
                        if (arr2 == "u") {
                            let total = (orders.money / (1 + bala + bala2) / orders.amount);
                            nhan_duoc += (total - orders.fee) * 8.64;
                        }
                    }
                }
            }
            if (arr2 == "u") {
                let bala = 0;
                let bala2 = 0;
                for (let i = 0; i < arr1.length; i++) {
                    if (arr1[i] != "") {
                        bala = arr1.length;
                    }
                }
                for (let i = 0; i < arr3.length; i++) {
                    if (arr3[i].length != "") {
                        bala2 = arr3.length;
                    }
                }
                let total = (orders.money / (1 + bala + bala2) / orders.amount);
                nhan_duoc += (total - orders.fee) * 8.64;
            }
            for (let i = 0; i < arr3.length; i++) {
                if (arr1[i] != "") {
                    let check1 = kq.includes(arr3[i]);
                    let bala = 0;
                    for (let i = 0; i < arr1.length; i++) {
                        if (arr1[i].length != "") {
                            bala = arr1.length;
                        }
                    }
                    if (!check1) {
                        let total = (orders.money / (arr3.length + bala) / orders.amount);
                        nhan_duoc += total * 6.91 - orders.fee;
                    }
                }
            }
            await connection.execute('UPDATE `result_k3` SET `get` = ?, `status` = 1 WHERE `id` = ? ', [nhan_duoc, id]);
            const sql = 'UPDATE `users` SET `money` = `money` + ? WHERE `phone` = ? ';
            await connection.execute(sql, [nhan_duoc, phone]);
        }
    }
}

const handlingK3 = async (typeid) => {

    let game = Number(typeid);

    await funHanding(game);

    await plusMoney(game);
}

const listOrderOld = async (req, res) => {
    let { gameJoin, pageno, pageto } = req.body;
    let auth = req.cookies.auth;

    let checkGame = ['1', '3', '5', '10'].includes(String(gameJoin));
    if (!checkGame || pageno < 0 || pageto < 0) {
        return res.status(200).json({
            code: 0,
            msg: "Không còn dữ liệu",
            data: {
                gameslist: [],
            },
            status: false
        });
    }
    const [user] = await connection.query('SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1  LIMIT 1 ', [auth]);

    let game = Number(gameJoin);

    const [k5d] = await connection.query(`SELECT * FROM k3 WHERE status != 0 AND game = '${game}' ORDER BY id DESC LIMIT ${pageno}, ${pageto} `);
    const [k5dAll] = await connection.query(`SELECT * FROM k3 WHERE status != 0 AND game = '${game}' `);
    const [period] = await connection.query(`SELECT period FROM k3 WHERE status = 0 AND game = '${game}' ORDER BY id DESC LIMIT 1 `);
    if (k5d.length == 0) {
        return res.status(200).json({
            code: 0,
            msg: "No more data",
            data: {
                gameslist: [],
            },
            page: 1,
            status: false
        });
    }
    if (!pageno || !pageto || !user[0] || !k5d[0] || !period[0]) {
        return res.status(200).json({
            message: 'Error!',
            status: false
        });
    }
    let page = Math.ceil(k5dAll.length / 10);
    return res.status(200).json({
        code: 0,
        msg: "Get success",
        data: {
            gameslist: k5d,
        },
        period: period[0].period,
        page: page,
        status: true
    });
}

const GetMyEmerdList = async (req, res) => {
    let { gameJoin, pageno, pageto } = req.body;
    let auth = req.cookies.auth;

    let checkGame = ['1', '3', '5', '10'].includes(String(gameJoin));
    if (!checkGame || pageno < 0 || pageto < 0) {
        return res.status(200).json({
            code: 0,
            msg: "No more data",
            data: {
                gameslist: [],
            },
            status: false
        });
    }

    let game = Number(gameJoin);

    const [user] = await connection.query('SELECT `phone`, `code`, `invite`, `level`, `money` FROM users WHERE token = ? AND veri = 1 LIMIT 1 ', [auth]);
    const [result_5d] = await connection.query(`SELECT * FROM result_k3 WHERE phone = ? AND game = '${game}' ORDER BY id DESC LIMIT ${Number(pageno) + ',' + Number(pageto)}`, [user[0].phone]);
    const [result_5dAll] = await connection.query(`SELECT * FROM result_k3 WHERE phone = ? AND game = '${game}' ORDER BY id DESC `, [user[0].phone]);

    if (!result_5d[0]) {
        return res.status(200).json({
            code: 0,
            msg: "No more data",
            data: {
                gameslist: [],
            },
            page: 1,
            status: false
        });
    }
    if (!pageno || !pageto || !user[0] || !result_5d[0]) {
        return res.status(200).json({
            message: 'Error!',
            status: true
        });
    }
    let page = Math.ceil(result_5dAll.length / 10);

    let datas = result_5d.map((data) => {
        let { id, phone, code, invite, level, game, ...others } = data;
        return others;
    });

    return res.status(200).json({
        code: 0,
        msg: "Get success",
        data: {
            gameslist: datas,
        },
        page: page,
        status: true
    });
}


module.exports = {
    K3Page,
    betK3,
    addK3,
    handlingK3,
    listOrderOld,
    GetMyEmerdList
}