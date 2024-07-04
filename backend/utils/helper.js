export const query = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      contributions {
        points
      }
      profile {
        reputation
        ranking
      }
      submissionCalendar
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
    recentSubmissionList(username: $username) {
      title
      timestamp
      statusDisplay
      lang
    }
    matchedUserStats: matchedUser(username: $username) {
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
          __typename
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
          __typename
        }
        __typename
      }
    }
  }
`;

function getFullCalandar(oldCalandar) {
  const startDate = Math.min(...Object.keys(oldCalandar));
  const endDate = Math.max(...Object.keys(oldCalandar));
  const dayInSeconds = 86400;

  let currentDate = startDate;
  const fullCalendar = {};

  while (currentDate <= endDate) {
    const dateKey = currentDate.toString();
    fullCalendar[dateKey] = oldCalandar[dateKey] || 0;
    currentDate += dayInSeconds;
  }

 return fullCalendar
}

export const formatData = (data) => {
    let sendData =  {
        totalSolved: data.matchedUser.submitStats.acSubmissionNum[0].count,
        totalSubmissions:  data.matchedUser.submitStats.totalSubmissionNum,
        totalQuestions: data.allQuestionsCount[0].count,
        easySolved: data.matchedUser.submitStats.acSubmissionNum[1].count,
        totalEasy: data.allQuestionsCount[1].count,
        mediumSolved: data.matchedUser.submitStats.acSubmissionNum[2].count,
        totalMedium: data.allQuestionsCount[2].count,
        hardSolved: data.matchedUser.submitStats.acSubmissionNum[3].count,
        totalHard: data.allQuestionsCount[3].count,
        ranking: data.matchedUser.profile.ranking,
        contributionPoint: data.matchedUser.contributions.points,
        reputation: data.matchedUser.profile.reputation,
        submissionCalendar: getFullCalandar(JSON.parse(data.matchedUser.submissionCalendar)),
        recentSubmissions: data.recentSubmissionList,
        matchedUserStats: data.matchedUser.submitStats
    }
    return sendData;
}