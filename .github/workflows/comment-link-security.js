module.exports = ({github, context}) => {
  manageComments(github, context);
}

function manageComments(github, context) {
    const fs = require('fs')
    const ev = JSON.parse(
      fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
    )
    repositoryUrl = github.server_url+"/"+github.repository
    console.log(repositoryUrl)
    const prNum = ev.pull_request.number
    console.log(prNum)
    url = repositoryUrl +
        "/security/code-scanning?query=pr%3A"+
        prNum +
        "+tool%3AFormalm+is%3Aopen"
    const body = "FormaLM has performed a code analysis " +
        "and generated a report. " +
        "Please check the [Security report]("+url+") "+
        "for more information."
    github.rest.issues.createComment({
      issue_number: context.issue.number,
      owner: context.repo.owner,
      repo: context.repo.repo,
      body: body
    });
}