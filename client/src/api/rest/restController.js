import http from '../interceptor';

export const registerRequest = (data) => http.post('/auth/registration', data);
export const loginRequest = (data) => http.post('/auth/login', data);
export const dataForContest = (data) =>
  http.post('/contests/dataForContest', data);
export const getCustomersContests = (data) =>
  http.post(
    '/contests/getCustomersContests',
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus,
      },
    }
  );
export const getContestById = (data) =>
  http.get('/contests/getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });
export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.post('/contests/getAllContests', {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  });
export const updateContest = (data) =>
  http.post('/contests/updateContest', data);
export const newMessage = (data) => http.post('/chat/newMessage', data);
export const getDialog = (data) => http.post('/chat/getChat', data);
export const getPreviewChat = () => http.post('/chat/getPreview');
export const changeChatBlock = (data) => http.post('/chat/blackList', data);
export const changeChatFavorite = (data) => http.post('/chat/favorite', data);
export const createCatalog = (data) => http.post('/chat/createCatalog', data);
export const changeCatalogName = (data) =>
  http.post('/chat/updateNameCatalog', data);
export const addChatToCatalog = (data) =>
  http.post('/chat/addNewChatToCatalog', data);
export const removeChatFromCatalog = (data) =>
  http.post('/chat/removeChatFromCatalog', data);
export const deleteCatalog = (data) => http.post('/chat/deleteCatalog', data);
export const getCatalogList = (data) => http.post('/chat/getCatalogs', data);
export const getUser = () => http.post('/user/getUser');
export const setNewOffer = (data) => http.post('/user/setNewOffer', data);
export const setOfferStatus = (data) => http.post('/user/setOfferStatus', data);
export const downloadContestFile = (data) =>
  http.get(`/user/downloadFile/${data.fileName}`);
export const payMent = (data) => http.post('/payOrder/pay', data.formData);
export const changeMark = (data) => http.post('/user/changeMark', data);
export const cashOut = (data) => http.post('/payOrder/cashout', data);
export const updateUser = (data) => http.post('/user/updateUser', data);
