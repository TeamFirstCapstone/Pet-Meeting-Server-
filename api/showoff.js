const Connection = require("./mysql");

module.exports = {
  best: () =>
    new Promise((resolve, reject) => {
      // Later, 저거 명령문 해킹 방지하기

      const _m = new Date();
      const month = _m.getMonth() != 0 ? _m.getMonth() : 12; // 한 달 빼주기
      const date = `${_m.getFullYear()}-${month}-${_m.getDate()}`;

      const sql = `SELECT s.ImgUrl, s.Text, s.Date, COUNT(v.UID) AS Votes, u.Username
                    FROM petmeeting.Showoff AS s
                    LEFT JOIN petmeeting.Vote AS v ON s.SID = v.SID
                    JOIN petmeeting.User AS u ON s.UID = u.UID
                    WHERE s.Date > str_to_date('${date}', '%Y-%m-%d')
                    GROUP BY s.SID ORDER BY Votes DESC LIMIT 1`;
      Connection.get().query(sql, (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      });
    }),
  list: (limit, offset) =>
    new Promise((resolve, reject) => {
      // Later, 저거 명령문 해킹 방지하기

      const sql = `SELECT s.SID, s.ImgUrl, s.Text, s.Date, u.Username
                    FROM petmeeting.Showoff AS s 
                    JOIN petmeeting.User AS u ON s.UID = u.UID
                    ORDER BY s.Date DESC LIMIT ${limit} OFFSET ${offset}`;
      Connection.get().query(sql, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    }),

  //TODO 먼저 Image를 어떻게 저장하고 배포할 건지 결정한 다음에야 구현 가능
  write: () =>
    new Promise((resolve, reject) => {
      const sql = ``;
      Connection.get().query(sql, option, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    }),
  // TODO update도 마찬가지.
  update: () =>
    new Promise((resolve, reject) => {
      const sql = ``;
      Connection.get().query(sql, option, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    }),

  get: (sid) =>
    new Promise((resolve, reject) => {
      const sql = `SELECT * FROM petmeeting.Showoff WHERE SID='${sid}'`;
      Connection.get().query(sql, (err, rows) => {
        if (err) reject(err);
        else resolve(rows[0]);
      });
    }),

  delete: (sid) =>
    new Promise((resolve, reject) => {
      const sql = `DELETE FROM petmeeting.Showoff WHERE SID='${sid}'`;

      Connection.get().query(sql, (err, rows) => {
        // rows가 어떻게 되어있는지 궁금
        if (err) reject(err);
        else resolve(rows);
      });
    }),
};