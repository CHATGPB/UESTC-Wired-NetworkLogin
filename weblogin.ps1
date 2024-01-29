
#在此填入你的信息
$username="202228225521"
$password="Iamsohandsome"


function netGet($url,$Parms)
{
$url =$url + "?callback=?&"
foreach ($Key in $Parms.Keys) {
    $url = $url + $Key + "=" + $($Parms[$Key]) + "&"
}

#echo $url.Substring(0,$url.Length-1)
$res = curl -Uri $url.Substring(0,$url.Length-1) -Method Get
$res = $res.Content
$match = [regex]::Matches($res, "{.*}")
$jsonstr=$match.Value | ConvertFrom-Json
return $jsonstr
}
function customObj2hashtable($cusObj)
{
$hashtable = $cusObj | ForEach-Object {

  $object = $_

  # determine the property names in this object and create a
  # sorted list
  $columns = $_ |
    Get-Member -MemberType *Property |
    Select-Object -ExpandProperty Name |
    Sort-Object

  # create an empty hash table
  $hashtable = @{}

  # take all properties, and add keys to the hash table for each property
  $columns | ForEach-Object {
    # exclude empty properties
    if (![String]::IsNullOrEmpty($object.$_))
    {
      # add a key (property) to the hash table with the
      # property value
      $hashtable.$_ = $object.$_
    }
  }
  $hashtable
}
return $hashtable
}

# main code
#chcp 936
cd $PSScriptRoot
#python -m weblogin.py
#$if=Get-NetIPAddress | Where-Object {$_.ifIndex -eq 12} | Where-Object {$_.AddressFamily -eq "IPV4"}
#$ip=$if.IPAddress
$res = curl -Uri "http://aaa.uestc.edu.cn"
$ip = ($res.InputFields | Where-Object {$_.id -eq "user_ip"}).value
$myhost="http://aaa.uestc.edu.cn"
$params=@{username=$username;domain="@dx-uestc";password=$password;`
            ac_id=1;ip=$ip;double_stack=0}
$params['username']=$params['username']+$params['domain']

# get Challenge
$url=$myhost + "/cgi-bin/get_challenge" +"?" `
+"callback=?&"`
+ "username=" + $params['username'] + "&" +"ip=" + $params['domain']
$clgCall=curl -Uri $url -Method Get
$clgCall = $clgCall.Content
$match = [regex]::Matches($clgCall, "{.*}")
$jsonstr=$match.Value | ConvertFrom-Json
$challenge=$jsonstr.challenge

#login
$file= '.\xEncode.js'
$token=$challenge
#$token="259bfbec76069d4e86a35ad11186b24a79d4ea625aae2d158d2082c624fdb4ee"
$json=node $file $token $params['username'] $params['password'] $params['ip'] | ConvertFrom-Json
$loginParams = customObj2hashtable $json
$url=$myhost + "/cgi-bin/srun_portal"
$res=netGet $url $loginParams
$dis="error:"+ $res.error + ";error_msg:"+ $res.error_msg
echo $res > weblogin.log
