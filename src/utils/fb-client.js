import { LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

class FBApiClient {
  getPublicInfo(fields, callback) {
    const request = new GraphRequest(`/me?fields=${fields.join(',')}`, null, callback);
    return new GraphRequestManager().addRequest(request).start();
  }
  logout() {
    return LoginManager.logOut();
  }
  login(permissions) {
    return LoginManager.logInWithReadPermissions(permissions)
  }

}

export default new FBApiClient();
