
 gh auth status 
  
  gh api --paginate \
  /users/edgar-treischl/packages/container/dash-deploy/versions \
  --jq '.[] | {id, created_at, tags: .metadata.container.tags}'


  gh api --paginate \
  /users/edgar-treischl/packages/container/dash-deploy/versions \
  --jq 'sort_by(.created_at) | reverse | .[1:] | .[].id' |
while read id; do
  gh api --method DELETE \
    "/users/edgar-treischl/packages/container/dash-deploy/versions/$id"
done