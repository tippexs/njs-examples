export default { groups }


/*
 * Extract Username from Auth-Basic Header and find groups
 * @param r RequestObject
 * @return HTTP 200 with X-Groups Header if found
 * @return HTTP 401 if no group was found
 * */

function groups(r) {
 const basicAuthB64 = r.headersIn['Authorization'].split(' ')[1]
 const user = Buffer.from(basicAuthB64, 'base64').toString().split(':')[0];
 
 const groups = {
  'lord': ['kings','admins', 'beer']
 }

 if ( groups[user] != undefined ) {
 // Set Groups Header to be cought by `auth_request_set`

  r.headersOut['X-Groups'] = groups[user].join(',');
  r.return(200);
 } else {
   r.return(401, "No Group found");
 }
}
