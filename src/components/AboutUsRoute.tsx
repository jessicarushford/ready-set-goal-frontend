import "./AboutUsRoute.css";
import mainNote from "../assets/images/main-note.png";
import jessica from "../assets/images/jessica.png";
import april from "../assets/images/april.png";
import isaiah from "../assets/images/isaiah.png";

const AboutUsRoute = () => {
  return (
    <div className="AboutUsRoute">
      <h2>about us</h2>
      <div className="about-us-card-container">
        <div className="us-container">
          <img src={mainNote} alt="Paper Note" className="main-note" />
          <h3 className="heading">jessica rushford</h3>
          <img
            src={jessica}
            alt="Jessica Rushford Headshot"
            className="headshot-img"
          />

          <p className="bio">
            During the last 10 years in the fitness industry, I have worked on a
            small core team, led multiple high-volume projects and events with
            attendances over two hundred people and managed and mentored
            hundreds of individuals. Throughout my project management
            experience, I have always been drawn to the tech aspects of my
            career, including building our company website and app. Therefore, I
            cannot wait to switch gears into the tech industry and become a
            front-end developer. I am passionate about designing digital user
            experiences and excited to apply my creative and technical skills.
            My goal is not only to become a web developer, but also to find a
            team that allows me to continue to grow and learn while inspiring
            others along the way.
          </p>
        </div>

        <div className="us-container">
          <img src={mainNote} alt="Paper Note" className="main-note" />
          <h3 className="heading april-name">sooyeon hong</h3>
          <img src={april} alt="April's Headshot" className="headshot-img" />

          <p className="bio">
            Highly efficient and creative teamplayer, with 5 years of previous
            experience in educational services and customer service. Currently
            completing the JavaScript coding bootcamp with Grand Circus in order
            to transition to the tech industry. When I studied fashion at the
            university, I had a chance to learn photoshop and was also
            interested in web design so I studied html and css which I really
            enjoyed. While changing careers is scary, I am embracing the unknown
            and turning that fear into excitement for what's next in my goals to
            become a full stack developer. I am particularly excited to leverage
            strengths in Javascript, Typescript, and React in order to create
            clean, user friendly, and accessible websites.
          </p>
        </div>

        <div className="us-container">
          <img src={mainNote} alt="Paper Note" className="main-note" />
          <h3 className="heading isaiah-name">isaiah sweezie</h3>
          <img src={isaiah} alt="Isaiah's Headshot" className="headshot-img" />

          <p className="bio">
            With 4 years of kitchen experience under my belt. I'm wizened in
            customer service, working under pressure, proficiency in
            communication, and the cooperation of working in a cohesive unit. I
            was first introduced to coding through family members and have
            relished my opportunity to explore it at first as an education and
            soon to be employment. My adventurous nature and appetite for the
            unknown leaves me excited with anticipation to the challenges I will
            face in the future. Currently, I am enrolled at the Grand Circus
            Bootcamp out of Detroit. Educating myself for a future career. I am
            ecstatic for an opportunity to use both my social skills for
            cooperation that have been honed in the kitchen. Appropriately
            exercising both my coding and teamwork skills to make future
            projects come to life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsRoute;
