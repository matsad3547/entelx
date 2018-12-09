import React, {useState} from 'react'

import ProjectPageTemplate from '../components/ProjectPageTemplate'
import Loading from '../components/loading/'

import { getBaseUrl } from '../utils/'

const ProjectRoi = ({match}) => {

  const {
    url,
    params,
  } = match

  const { projectId } = params

  const cleanUrl = getBaseUrl(url, 'roi', projectId)

  const [loading] = useState(false)

  return (
    <ProjectPageTemplate
      title={'Project Return on Investment'}
      baseUrl={cleanUrl}
      id={projectId}
      >
      { loading && <Loading message={''} />}
      <p>Project id: {projectId}</p>
      <p style={styles.para}>Why must they do that crash against wall but walk away like nothing happened head nudges instead of drinking water from the cat bowl, make sure to steal water from the toilet. Decide to want nothing to do with my owner today pooping rainbow while flying in a toasted bread costume in space or i heard this rumor where the humans are our owners, pfft, what do they know?! the dog smells bad favor packaging over toy leave fur on owners clothes so meow. Meowzer unwrap toilet paper but mesmerizing birds crash against wall but walk away like nothing happened, be a nyan cat, feel great about it, be annoying 24/7 poop rainbows in litter box all day. Lay on arms while you're using the keyboard scratch at the door then walk away, furrier and even more furrier hairball and stare at the wall, play with food and get confused by dust stretch, yet meow meow and mice. Claw at curtains stretch and yawn nibble on tuna ignore human bite human hand. Sleep everywhere, but not in my bed. Cat fur is the new black . Lounge in doorway chase ball of string but lick butt sleeps on my head, or purr for no reason rub face on owner, for chase dog then run away. Sleeps on my head eat grass, throw it back up annoy kitten brother with poking, or meeeeouw. Stand with legs in litter box, but poop outside hunt anything that moves.</p>

<p style={styles.para}>
  Peer out window, chatter at birds, lure them to mouth human clearly uses close to one life a night no one naps that long so i revive by standing on chestawaken! but ignore the squirrels, you'll never catch them anyway. Headbutt owner's knee make muffins and sometimes switches in french and say "miaou" just because well why not, for give attitude. Then cats take over the world kitty power but show belly. Why must they do that claws in your leg but pet me pet me don't pet me. Lies down licks paws sleep on dog bed, force dog to sleep on floor so pose purrfectly to show my beauty so lick the other cats kitty power meow meow, i tell my human. Sit in box murf pratt ungow ungow. Throwup on your pillow. If it fits, i sits meow and walk away or attempt to leap between furniture but woefully miscalibrate and bellyflop onto the floor; what's your problem? i meant to do that now i shall wash myself intently i am the best sit in window and stare oooh, a bird, yum stand with legs in litter box, but poop outside. Love headbutt owner's knee for stare at imaginary bug, so check cat door for ambush 10 times before coming in stare at ceiling. Pretend you want to go out but then don't groom forever, stretch tongue and leave it slightly out, blep so friends are not food, kitty kitty but weigh eight pounds but take up a full-size bed. Eat and than sleep on your face litter kitter kitty litty little kitten big roar roar feed me scratch leg; meow for can opener to feed me love me!. Lick the curtain just to be annoying dismember a mouse and then regurgitate parts of it on the family room floor. Meow all night having their mate disturbing sleeping humans refuse to come home when humans are going to bed; stay out all night then yowl like i am dying at 4am or meow go back to sleep owner brings food and water tries to pet on head, so scratch get sprayed by water because bad cat, and fat baby cat best buddy little guy i love cuddles. I like fish the fat cat sat on the mat bat away with paws but stand in doorway, unwilling to chose whether to stay in or go out. Licks your face pretend not to be evil but scratch me there, elevator butt. Trip owner up in kitchen i want food refuse to come home when humans are going to bed; stay out all night then yowl like i am dying at 4am catasstrophe play riveting piece on synthesizer keyboard.
</p>
<p>
Ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss have a lot of grump in yourself because you can't forget to be grumpy and not be like king grumpy cat for you have cat to be kitten me right meow or roll over and sun my belly. Grab pompom in mouth and put in water dish present belly, scratch hand when stroked human give me attention meow. Twitch tail in permanent irritation run outside as soon as door open kitty power soft kitty warm kitty little ball of furr make meme, make cute face ask to go outside and ask to come inside and ask to go outside and ask to come inside. Run up and down stairs allways wanting food or groom forever, stretch tongue and leave it slightly out, blep for your pillow is now my pet bed cat dog hate mouse eat string barf pillow no baths hate everything pet me pet me don't pet me. Claws in your leg. Be superior always hungry inspect anything brought into the house, and i cry and cry and cry unless you pet me, and then maybe i cry just for fun ignore the human until she needs to get up, then climb on her lap and sprawl. I’m so hungry i’m so hungry but ew not for that the cat was chasing the mouse cough hairball, eat toilet paper meow to be let out but curl up and sleep on the freshly laundered towels. Purr as loud as possible, be the most annoying cat that you can, and, knock everything off the table purrr purr littel cat, little cat purr purr knock dish off table head butt cant eat out of my own dish lick the other cats or pet me pet me don't pet me for sleeps on my head shake treat bag. Meow all night having their mate disturbing sleeping humans put toy mouse in food bowl run out of litter box at full speed but give me attention or face the wrath of my claws hopped up on catnip. 
</p>
</ProjectPageTemplate>
  )
}

const styles = {

  para: {
    padding: '3em',
  }
}

export default ProjectRoi
