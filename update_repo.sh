#!/bin/bash
declare -a repos=(
  "github.com/tholau27/RacingGame|RacingGame"
  "github.com/chloebergman12/Multiplayer-Car-Race-Game|CarRaceB"
  "github.com/makb0925/Pokemon_Game|Pokemon"
  "github.com/andrewhockey65-pixel/MewtwoSurvival|MewtwoSurvival"
  "github.com/sebbra26-creator/STOCKLE|Stockle"
  "github.com/thejeo27/HumanBenchmark|HumanBenchmark"
  "github.com/clajoo27/Dolphin-Pop|DolphinPop"
  "github.com/tyler-bergman/Final-Project|CarRace"
  "github.com/dylanjhub/Surf-Rider|SurfingGame"
  "github.com/serenego127/mazeRun|MazeGame"
  "github.com/ryansunbinkim-art/Pokemon-Game|PokemonB"
  "github.com/timisverycool-ui/BerryCatcher|PokeBerryCatcher"
  "github.com/gurvinder1027/ChargerChaos|ChargingChaos"
  "github.com/george123-cloud/DoodleJump|DoodleJump"
  "github.com/jalen-hall/CannonBBALL|CannonBall"
  "github.com/shinwin124/GameForCompSci|RavenousRandy"
  "github.com/nickyawesome821/Marathon-game|MarathonRace"
  "github.com/deabiba1/spacegame|BrickGame"
  "github.com/amir-suckra/BlockBreak|BlockBreak"
  "github.com/gianna-lobue/Yahtzee-|Yahtzee"
  "github.com/sallyrubin724/SpongebobGame|JellyFish"
  "github.com/jamgil27-glitch/Santa-Game|SantaGame"
  "github.com/nicholasrozenblit-wq/siteReading|MusicNotes"
  "github.com/jacyag125/Zombie-Run|ZombieRun"
  "github.com/miguelyangel515-svg/Super-Striker-game|SuperStriker"
  "github.com/yurihan08/BasketballGame|Basketball"
)

REPO_BASE="/Users/fators/Desktop/CreatePTs"

for repo_info in "${repos[@]}"; do
  IFS='|' read -r repo_url folder_name <<< "$repo_info"
  folder_path="$REPO_BASE/$folder_name"
  
  echo "Updating $folder_name..."
  cd "$folder_path" || continue
  
  if [ -d ".git" ]; then
    git clean -fdx --exclude=index.png
    git pull origin main
  else
    git init
    git remote add origin "https://$repo_url.git"
    git pull origin main
  fi
  
  echo "✓ Done"
done

echo "All repos updated!"