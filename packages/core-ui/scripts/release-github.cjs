const { execSync } = require('node:child_process')
const fs = require('node:fs')

function sh(cmd) {
  return execSync(cmd, { stdio: 'inherit' })
}

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const version = pkg.version
const tag = `v${version}`

console.log(`Releasing ${tag}...`)

sh('git config user.name "github-actions[bot]"')
sh(
  'git config user.email "41898282+github-actions[bot]@users.noreply.github.com"',
)

sh('pnpm run build')
sh('npm publish --registry https://npm.pkg.github.com --access public')

// Tag (only if not already)
try {
  sh(`git tag ${tag}`)
} catch {
  console.log('Tag already exists, skipping tag creation.')
}
try {
  sh(`git push origin ${tag}`)
} catch {
  console.log('Tag already pushed, skipping.')
}

// Create GitHub Release (requires GH CLI; available on runners)
try {
  // Minimal notes; you can enhance later to pull from CHANGELOG.md
  sh(`gh release create ${tag} --title "${tag}" --notes "Release ${tag}"`)
} catch {
  console.log('Release already exists (or gh failed). Skipping.')
}

console.log(`Done: ${tag}`)
