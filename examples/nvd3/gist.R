#" Function that takes a list of files and creates payload for API
#'
#' @param filenames names of files to post
#' @param description brief description of gist (optional)
#' @param public whether gist is public (defaults to TRUE)
create_gist <- function(filenames, description = "", public = TRUE){
  files = lapply(filenames, function(file){
    x = list(content = paste(readLines(file, warn = F), collapse = '\n'))
  })
  names(files) = filenames
  body = list(description = description, public = public, files = files)
  RJSONIO::toJSON(body)
}


#' Function that posts a directory of files as a gist
#' 
#' @param filenames names of files to post
#' @param description brief description of gist
#' @param public whether gist is public (defaults to TRUE)
post_gist <- function(filenames, description = "", public = TRUE, browse = FALSE){
  g_url = "https://api.github.com/gists"
  gist = create_gist(filenames, description, public)
  posted = httr::POST(g_url, body = gist)
  if (browse) { browseURL(content(posted)$html_url) }
  return(content(posted)$html_url)
}

#' Create github repo
#' 
#' 
create_repo <- function(body, appname, key, secret = NULL){
  require(httr); require(rjson)
  oauth_url <- "https://github.com/login/oauth"
  gh_end <- oauth_endpoint(NULL, "authorize", "access_token", oauth_url)
  gh_app <- oauth_app(appname, key, secret)
  gh_token <- oauth2.0_token(gh_end, gh_app, scope = 'user, repo')
  gh_sig <- sign_oauth2.0(gh_token$access_token)
  POST('https://api.github.com/user/repos', gh_sig, body = toJSON(body))
}


curl -u 'ramnathv' -d '{"scopes":["repo"],"note":"Help example"}' https://api.github.com/authorizations

system('curl -v -u ramnathv -X POST https://api.github.com/authorizations --data "{\"scopes\":[\"gist\"]}')
# 
POST('https://api.github.com/authorizations', config = add_headers(Authorization = "token 8c5e30167cb2d6e701f12cb29e1c09fd9a312a08"), body = list(scopes = 'gist'))